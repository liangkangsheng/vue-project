<template>
   <div id="app">
   	    <!--将子控件属性inputValue与父组件msg属性绑定-->
   	    <!--<header-h></header-h>-->
   	    <header-h :seller="sellerData"></header-h>
   	    <div class="tab boder-top">
   	   	    <div class="tab-item">
   	   	    	<!--<a href="" v-link="{path:'/goods'}">商品</a>-->   	
   	   	    	<router-link to="/goods">商品</router-link>
   	   	    </div>
   	   	    <div class="tab-item">
   	   	    	<!--<a href="" v-link="{path:'/ratings'}">评论</a>-->
   	   	  	    <router-link to="/ratings">评论</router-link>
   	   	    </div>
    	    <div class="tab-item">
    	    	<!--<a href="" v-link="{path:'/seller'}">商家</a>-->
    	        <router-link to="/seller">商家</router-link>
    	    </div>
   	    </div>
   	    <transition name="fade" mode="out-in">
   	   	    <router-view :seller="sellerData" keep-alive></router-view>
   	    </transition>
   </div>
</template>
<script>
import {urlParse} from '../src/assets/js/util.js';
import header from './components/header/header.vue';
const ERR_ON=0;
export default{
	components:{
		"header-h":header
	},
	data(){
		return{
			sellerData:{
				id: (() => {
		            let queryParam = urlParse();
		            return queryParam.id;
		        })()
			},
//			msg:"kkkk"
		}
	},
	created(){
	    this.$http.get('/api/seller?id='+this.sellerData.id).then(function(res){
	    	res=res.body;
	   	    if(res.errno===ERR_ON){
	   	    	this.sellerData=Object.assign({},this.sellerData,res.data);
	   	    }
	    })
	}
}
</script>
<style>
	/*效果添加*/
	.tab-item a.router-link-active{
		color:rgb(240,20,20)
	} 
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s ease;
	}
	.fade-enter, .fade-leave-active {
	  opacity: 0
	}
	
	/*主页样式*/
	#app .tab{
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		/*border-bottom:1px solid rgba(7,17,27,0.1)*/
	}
	.tab .tab-item{
		flex:1;
		text-align: center;
	}
	.tab-item a{
		display:block;
		font-size:14px;
		color:rgb(77,85,93);
	}	
</style>