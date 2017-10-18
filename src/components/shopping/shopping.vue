<template>
	<div id="shopping">	
		<!--底部购物车-->
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'link':totalCount>0}">
						<span class="icomoon icon-shopping_cart" :class="{'link':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'link':totalCount>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop.prevent="goPrice">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<!--@before-enter="beforeEnter"	//动画enter进入之前
	　　@enter="enter"	//动画enter进入中
	　　@afterEnter="afterEnter"	//动画enter进入之后
	　　@beforeLeave="beforeLeave"	//动画leave离开之前
	　　@leave="leave"	//动画leave离开中
	　　@afterLeave="afterLeave"	//动画leave离开之后
	　　并且每个事件都有el参数,表示当前元素
	　　beforeEnter(el){}-->
	    <!--小球-->
		<div class="ball-container">
			<div  v-for="ball in balls" >
				<transition name="drop"
		        	@before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
		          <div class="ball" v-show="ball.show">
		            <div class="inner inner-hook"></div>
		          </div>
		        </transition>
			</div>

	    </div>
	    <!--购物车列表-->
		<transition name="fold">
			<div class="shopping-list" v-show="listShow" :class="{'fold-transition': isActive}">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listConcent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}扁豆</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
							   <cartcontrol :food="food" @add="addFood"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<!--商品遮罩-->
		<transition name="fade" mode="out-in">
		    <div class="list-mask" @click="hideList" v-show="listShow"></div>
	    </transition>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import cartcontrol from '../cartcontrol/cartcontrol.vue';
	export default{
		props:{
			selectFoods:{
				type:Array,
				default(){
					return [
					   {
					   	price:10,
					   	count:1
					   }
					];
				}
			},
			deliveryPrice:{
				type:Number,
				default:"null"//可以设置默认值
			},
			minPrice:{
				type:Number,
				default:"null"//可以设置默认值
			}
		},
		components:{
			cartcontrol
		},
		data(){
			return{
				balls:[
				   {show:false},
				   {show:false},
				   {show:false},
				   {show:false},
				   {show:false}
				],
				dropBalls:[],
				isActive:true,
				fold:true
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.selectFoods.forEach((food)=>{
					total+=food.price*food.count
				})
				return total
			},
			totalCount(){
				let count=0;
			    this.selectFoods.forEach((food)=>{
					count+=food.count
				})
			    return count
			},
			payDesc(){
				if(this.totalPrice===0){
					return `￥${this.minPrice}元起送`
				}
				else if(this.totalPrice<this.minPrice){
					let diff=this.minPrice-this.totalPrice
					return `还差￥${diff}元起送`
				}else{
					return `去结算`
				}
			},
			payClass(){
				if(this.totalPrice<this.minPrice){
					return 'not-enough'
				}else{
					return 'enough'
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold=true;
					return false;
				}
				let show =!this.fold;
				if(show){
					this.$nextTick(()=>{
						if(!this.scroll){
							this.scroll=new BScroll(this.$refs.listConcent, {
								click:true
							})
						}
						else{
							this.scroll.refresh();
						}
					})
				}
				return show;
			}
		},
		methods:{
			addFood(target) {
	            this.drop(target);
		    },
			drop(el) { 
				console.log(el)
		        //触发一次事件就会将所有小球进行遍历
		        for (let i = 0; i < this.balls.length; i++) {
		            let ball = this.balls[i];
		            console.log(ball)
		            if (!ball.show) { //将false的小球放到dropBalls
			            ball.show = true;
			            ball.el = el; //设置小球的el属性为一个dom对象
//		                ball.el.style.display = 'block'; 
			            this.dropBalls.push(ball);   
			            return;
			        }
		           
		        }
		    },
		    // 过渡进入
            // 设置过渡进入之前的组件状态
		    beforeEnter(el){ //这个方法的执行是因为这是一个vue的监听事件
		        let count = this.balls.length;
		        while (count--) {
		            let ball = this.balls[count];
		            if (ball.show) {
			            let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
			            let x = rect.left - 32;
			            let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
			            el.style.display = ''; //清空display
			            el.style.webkitTransform = `translate3d(0,${y}px,0)`; 
			            el.style.transform = `translate3d(0,${y}px,0)`;
			            //处理内层动画
			            let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
			            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
			            inner.style.transform = `translate3d(${x}px,0,0)`;
			        }
		        }
		    },
		    // 设置过渡进入完成时的组件状态
		    enter(el, done) { //这个方法的执行是因为这是一个vue的监听事件
		        /* eslint-disable no-unused-vars */
		        let rf = el.offsetHeight; //触发重绘html
		        this.$nextTick(() => { //让动画效果异步执行,提高性能
		           el.style.webkitTransform = 'translate3d(0,0,0)';
		           el.style.transform = 'translate3d(0,0,0)';
		           //处理内层动画
		           let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
		           inner.style.webkitTransform = 'translate3d(0,0,0)';
		           inner.style.transform = 'translate3d(0,0,0)';
		           el.addEventListener('transitionend', done);//Vue为了知道过渡的完成，必须设置相应的事件监听器。
		        });
		    },
		    // 设置过渡进入完成之后的组件状态
		    afterEnter(el) { //这个方法的执行是因为这是一个vue的监听事件
		        let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
		        console.log(ball)
		        if (ball) {
		            ball.show = false;
		            el.style.display = 'none'; //隐藏小球
		        }
		    },		
			toggleList(){
				if(!this.totalCount){
					return;
				}
				this.fold=!this.fold
			},
			hideList(){
				this.fold=true
			},
			empty(){
				this.selectFoods.forEach((food)=>{
					food.count=0;
				})
			},
			goPrice(){
				if(this.totalPrice<this.minPrice){
					return;
				}
				window.alert(`支付${this.totalPrice}元`)
			}
		}	    
	}
</script>

<style scoped>
	#shopping .list-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
		backdrop-filter:blur(10px);
		background: rgba(7,17,27,0.6);
	}
	#shopping{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
	}
	#shopping .content{
		display: flex;
		background: #141d27;
		font-size: 0;
	}
	.content .content-left{
		flex: 1;
	}
	.content-left .logo-wrapper,.content-left .price,
	.content-left .desc{
		display: inline-block;
	}
	.content-left .logo-wrapper{
		position: relative;
		top: -10px;
		margin: 0 12px;
		padding: 6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		vertical-align: top;
		border-radius: 50%;
		background: #141d27;
	}
	.logo-wrapper .logo{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #2b343c;
		text-align: center;
	}
	.logo-wrapper .logo.link{
		background: rgb(0,160,220);
	}
	.logo-wrapper .num{
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		border-radius: 16px;
		font-size: 9px;
		font-weight: 700;
		color: #fff;
		background: rgb(240,20,20);
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
	}
	.logo-wrapper .logo .icon-shopping_cart{
		font-size: 24px;
		color: #80858a;
		line-height: 44px;
	}
	.logo-wrapper .logo .icon-shopping_cart.link,.content-left .price.link{
		color: #fff;
	}
	.content-left .price{
		vertical-align: top;
		line-height: 24px;
		margin-top: 12px;
		padding-right: 12px;
		box-sizing: border-box;
		border-right: 1px solid rgba(255,255,255,0.1);
		font-size: 16px;
		font-weight: 700;
		color: rgba(255,255,255,0.4);
	}
	.content-left .desc{
		vertical-align: top;
		line-height: 24px;
		margin:12px 0 0 12px;
		color: rgba(255,255,255,0.4);
		font-size: 10px;
	}
	.content .content-right{
		flex: 0 0 105px;
		width: 105px;
	}
	.content-right .pay{
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 12px;
		color: rgba(255,255,255,0.4);
		font-weight: 700;
	}
	.content-right .pay.not-enough{
		background: #2B333B;
	}
	.content-right .pay.enough{
		background: #00b43c;
		color: #fff;
	}
	/*动画小球*/
	#shopping .ball-container .ball{
		position: fixed;
		left: 32px;
		bottom: 22px;
		z-index: 200;
		/*transition: all 0.4s linear*/
		transition: all 0.4s cubic-bezier(0.49, -0.29,0.75,0.41);
	}
	.ball .inner{
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgb(0,160,220);
		transition: all 0.4s linear;
	}
	#shopping .shopping-list{
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		width: 100%;
	}
	#shopping .shopping-list.fold-transition{
		transition: all 0.5s;
		transform: translate3d(0,-100%,0);
	}
	#shopping .shopping-list.fold-enter,
	#shopping .shopping-list.fold-leave-active{
		transform: translate3d(0,0,0);
	}
	.list-header{
		height: 40px;
		line-height: 40px;
		padding: 0 18px;
		background: #F3F5F7;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.list-content{
		padding: 0 18px;
		max-height: 217px;
		background: #fff;
		overflow: hidden;
	}
	.list-content .food{
		position: relative;
		padding: 12px 0;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.food .name{
		line-height: 24px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.food .price{
		position: absolute;
		right: 90px;bottom: 12px;
		line-height: 24px;font-size: 14px;
		font-weight: 700;
		color: rgb(240,20,20);
	}
	.food .cartcontrol-wrapper{
		position: absolute;
		right: 0;
		bottom: 6px;
	}
	.list-header .title{
		float: left;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.list-header .empty{
		float: right;
		font-size: 12px;
		color: rgb(7,160,220);
	}
</style>