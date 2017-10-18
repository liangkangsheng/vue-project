// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//当前rem单位换算
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 +"px";
      var deviceWidth = document.documentElement.clientWidth;
      if (deviceWidth > 750) {
        deviceWidth = 750;
      }
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
/*使用webpack打包之后默认加载main.js文件并将其引入到index.html文件中*/
import Vue from 'vue'
import App from './App.vue'
//这里引入的是router目录，会默认识别里面的index.js文件（不能是其他名字）
import router from './router'
//使用路由模块
import VueRouter from "vue-router"
Vue.use(VueRouter);
// 引入并使用vue-resource网络请求模块
import VueResource from 'vue-resource'      
Vue.use(VueResource)

//引入vue的手机端滑动依赖库
require('vue-swipe/dist/vue-swipe.css');
//引入icon图标的css
require('./assets/icomoon.css');
//引入css的animate动画库
require('./assets/animate.min.css');
//引入sass
//require('./assets/tongyongyangshi.scss');

// in ES6 modules
import { Swipe, SwipeItem } from 'vue-swipe';
// in CommonJS
const { swipe, swipeItem } = require('vue-swipe');
//注册vue的手机端滑动依赖库
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);


Vue.config.productionTip = false
/*在应用启动时，可以通过设置 Vue.config.productionTip = false 来关闭生产模式下给出的提示*/


/* 实例化vue对象配置选项路由及渲染App组件 */
new Vue({
  el: '#app', //这里绑定的是index.html中的id为app的div元素
  router,
  template: '<App/>',
  components: { App }
  /*此处的 el:'#app', 表示的是index中的那个 <div id="app"></div>, 它要被 App这个组件
  components: { App } 的模板 template: '<App/>'替换*/
 
//render: h => h(App)
//这里的render: h => h(App)是es6的写法 
//转换过来就是：  暂且可理解为是渲染App组件
//  render:(function(h){
//    return h(App);
//  });
})
