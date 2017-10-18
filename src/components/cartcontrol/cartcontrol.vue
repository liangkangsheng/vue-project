<template>
	<div id="cartconcontrol">
		<transition name="move">
			<div class="cart-decrease" @click.stop.prevent="removeCart" v-show="food.count>0">
		      <span class="liner icomoon icon-remove_circle_outline"></span>
		    </div>
		</transition>
	    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
	    <div class="cart-add icomoon icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
	
</template>

<script>
	import Vue from 'vue'
	export default{
		props:{
			food:{
				type:Object
			}
		},
//		created(){
//			console.log(this.food)
//		},
		methods:{
			addCart(event){
				if(!event._constructed){
					return;
				}
				console.log("添加")
				if(!this.food.count){
					Vue.set(this.food,'count',1)
				}else{
					this.food.count++
				}
				this.$emit('add', event.target);
			},
			removeCart(event){
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--
				}
			}
		}
	}
</script>
   
<style>  
	/*样式*/
	#cartconcontrol{
		font-size: 0;
	}
	#cartconcontrol .cart-count,
	#cartconcontrol .cart-decrease,
	#cartconcontrol .cart-add{
		display: inline-block;
	}
	
	#cartconcontrol .cart-count{
		vertical-align: top;
		padding-top: 6px;
		line-height: 24px;
		text-align: center;
		font-size: 10px;
		color:rgb(147,153,159)
	}
	#cartconcontrol .cart-decrease{
		padding: 6px;
		transition: all 0.4s linear;
	}
	/*动画*/
	#cartconcontrol .cart-decrease.move-transition{
		opacity: 1;
		transform: translate3d(0,0,0);
	}
	#cartconcontrol .cart-decrease.move-enter,
	#cartconcontrol .cart-decrease.move-leave-active{
		opacity: 0;
		transform: translate3d(24px,0,0);
	}
	#cartconcontrol .cart-decrease.move-enter .liner,
	#cartconcontrol .cart-decrease.move-leave-active .liner{
		transform: rotate(180deg);
	}
	#cartconcontrol .cart-decrease .liner{
		display: inline-block;
		line-height: 24px;
		font-size: 24px;
		color: rgb(0,160,220);
		transition: all 0.4s linear;
		transform: rotate(0);
	}
	#cartconcontrol .cart-add{
		padding: 6px;
		line-height: 24px;
		font-size: 24px;
		color: rgb(0,160,220);
	}
</style>