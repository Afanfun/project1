// 引入路由组件
// import Home from '@/pages/Home';
// import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

/* 
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首屏的加载速度;高效
*/

// 路由配置信息
export default [
    {
        path:"/center",
        component:Center,
        meta:{show:true},
        // 二级路由组件
        children:[
            {
                path:"myorder",
                component:MyOrder,
            },
            {
                path:"grouporder",
                component:GroupOrder,
            },
            // 路由重定向
            {
                path:'/center',
                redirect:'/center/myorder',
            }
        ],
    },
    {
        path:"/paysuccess",
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:"/pay",
        component:Pay,
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade'){
                next();
            }else{
                next(false);
            }
        },
    },
    {
        path:"/trade",
        component:Trade,
        meta:{show:true},
        // 路由独享守卫
        beforeEnter:(to,from,next)=>{
            // 去交易页面,必须从购物车来
            if(from.path=='/shopcart'){
                next();
            }else{
                // 其他路由组件来,停留当前
                next(false);
            };
        },
    },
    {
        path:"/shopcart",
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:"/addcardsuccess",
        name:"addcardsuccess",
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:"/detail/:skuid",
        component:Detail,
        meta:{show:true}
    },
    {
        path:"/home",
        component:()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",
        component:()=>import('@/pages/Search'),
        meta:{show:true},
        name:'search',
        // 第一种:布尔值写法: 只能传递params
        // props:true,
        // 第二种：对象写法:额外给路由组件传递一些props
        // props:{a:1,b:2}
        // 第三种：函数写法
        props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
    },
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    // 重定向:项目跑起来的时候,访问/定向到首页;/或*都可以
    {
        path:'*',
        redirect:'/home'
    }
]