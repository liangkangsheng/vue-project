//在router/index.js文件中创建路由并配置路由映射 ，并通过export输出router到main.js文件中
//引入路由模块并使用它
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 创建路由实例并配置路由映射
//poth:"*",redirect:"/home" 重定向到path是/home的映射
//第一种写法
const router=new Router({
//	mode:"history",//切换路径模式，变成history模式，不然路径为/#/home
////scrollBehavior 设置了滚动条起始位置。
//	scrollBehavior:()=>({
//		y=0
//	}),
//	linkActiveClass="active",//如果需要的话可以配置路由被点击后类名
	routes: [
      {
	    path: '/goods',
	    //component: require('../components/home.vue')
	    component: resolve => require(['../components/goods/good.vue'], resolve), //懒加载
      },
      {
	    path: '/ratings',
	    //component: require('../components/home.vue')
	    component: resolve => require(['../components/ratings/rating.vue'], resolve), //懒加载
      },
      {
	    path: '/seller',
	    //component: require('../components/home.vue')
	    component: resolve => require(['../components/seller/seller.vue'], resolve), //懒加载
      },
      {
     	//重定向到path是/home的映射(hash为空刷新页面时使之重定向到/home页面)
   	    path:"/",
   	    redirect:'/goods',
      }
    ]
});
/*此方法是给全局中的每个路由页面都加判断*/
//router.beforeEach((to, from, next) => {
//	console.log("我将发生跳转");
//	next();
//})
//after 钩子没有next 方法，不能改变导航
//router.afterEach((to, from) => {
//	console.log("跳转完成");
//})

// 输出router
export default router;




//第二种写法
//export default new Router({
//routes: [
//  {
//    path: '/',
//    name: 'Hello',
//    component: Hello
//  }
//]
//})