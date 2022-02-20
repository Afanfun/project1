import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store'
// 引入mockServe.js----mock数据
import '@/mock/mockServe'
// 引入swiper样式,任何组件都可以用
import 'swiper/css/swiper.css'
import Carousel from "@/components/Carousel"
import Pagination from "@/components/Pagination"
import { MessageBox } from 'element-ui';
// 第一个参数:全局组件的名字 第二个参数:哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// ElemenrUI注册组件,挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api';
// console.log(API);  // 对象

import atm from '@/assets/1.gif'

// 引入插件VueLazyload
import VueLazyload from 'vue-lazyload';
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:atm
});

// 引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  router,
  // 注册仓库:组件实例的身上会多一个属性$store
  store
}).$mount('#app')
