import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// 使用插件
Vue.use(VueRouter);
import store from '@/store';
// 重复触发路由会报错 vue-router3.2.0(引入了promise) 出现的
// 先把VueRouter原型对象的push备份了一份
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// 重写push|replace
// 第一个参数:告诉原来的push方法,往哪里跳转(传递哪些参数)
// 第二个参数:成功的回调
// 第三个参数:失败的回调
// 相同点:都可以调用函数一次,都可以篡改函数的上下文一次
// 不通电:call与apply传递参数: call传递参数用逗号隔开,apply方法执行,传递数组
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
VueRouter.prototype.push = function push(location,resolve,reject){
    if(resolve && reject){
        originalPush.call(this,location,reject);
    }else{
        originalPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function replace(location,resolve,reject){
    if(resolve && reject){
        originalReplace.call(this,location,reject);
    }else{
        originalReplace.call(this,location,()=>{},()=>{})
    }
}

let router = new VueRouter({
    // routes:routes
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // 返回的y=0,代表滚动条在页面最上方
        return { y: 0 }
    }
});

// 全局守卫:前置守卫,在路由跳转之前进行判断
router.beforeEach(async (to,from,next)=>{
    // to: 可以获取到你要跳转到哪个路由的信息
    // from: 可以获取到你从哪个路由来的信息
    // next: 放行函数  1.next() 全放行;   2.next('/login') 放行到指定的路由;   3.next(false) 
    next();
    // 用户登录才会有token,未登录一定不会有token
    let token = store.state.user.token;
    // 用户信息(空对象也是真,所以要判断name属性字符串)
    let name = store.state.user.userInfo.name;
    // 用户已经登录
    if(token){
        // 用户已登录,不能去login页面,停留在首页
        if(to.path=='/login'){
            next('/');
        }else{
            // 登录了,去的不是login [home|search|] 
            // 如果用户名已有
            if(name){
                next();
            }else{
                // 没有用户信息,派发action 让仓库存储用户信息再跳转
                try {
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // token失效了,获取不到用户信息,重新登陆
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login');
                }
            }
        }
    }else{
        // 未登录,不能去与交易相关的路由;;不能去支付相关[pay|paysuccess];;不能去个人中心
        // console.log(to.path);  // 可以拿到路由path
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 把未登录想去的地址,存储在路由当中,登录后即可跳转目的地址
            next('/login?redirect='+toPath);
        }else{
            // 去的(home|search|shopCart)放行
            next();
        }
        
    }
});

export default router;