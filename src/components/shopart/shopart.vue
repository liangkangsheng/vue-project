<template>
	<div id="shopping">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo">
						<span class="icomoon icon-shopping_cart"></span>
					</div>
				</div>
				<div class="price">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay">￥{{minPrice}}元起送</div>
			</div>
		</div>
	</div>
</template>

<script>
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
	    computed:{
	    	totalPrice(){
				let total=0;
				this.selectFoods.forEach((food)=>{
					total += food.price * food.count;
				})
				return total
			},
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
		bottom: 0;
		left: 0;
		width: 100%;
		height: 48px;
	/*	backdrop-filter:blur(10px);*/
		background: rgba(7,17,27,0.6);
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