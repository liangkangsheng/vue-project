<template>
	<!--v-el在vue2.x以后被淘汰。使用新的标签ref替换v-el-->
	<div id="goods">
		<div class="menu-wrapper" ref="menuWrapper">
	        <ul>
	            <li v-for="(item,index) in goodsData" class="menu-item" :class="{'current':currentIndex===index}" 
	            	@click="selectMenu(index,$event)" ref="menuList">
	            	    <span class="text"><span :class="classMap[item.type]" v-show="item.type>0" 
	            		class="icon"></span>{{item.name}}</span>
	            </li>
	        </ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goodsData" class="food-list" ref="foodList">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item boder-top">
							<div class="icon">
							    <img :src="food.icon" width="57px"/>
							</div>
							<div class="content">
							    <h2 class="name">{{food.name}}</h2>
							    <p class="desc">{{food.description}}</p>
							    <div class="extra">
							    	<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
							    </div>
							    <div class="price">
							    	<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
							    </div>
							    <div class="cartcontrol-wrapper">
								   <cartcontrol :food="food" @add="addFood"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	    <shopping :selectFoods="selectFoods" ref="shopping" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopping>
	    <food :food="selectedFood" ref="food" @add='addFood'></food>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopping from '../shopping/shopping.vue';
	import cartcontrol from '../cartcontrol/cartcontrol.vue';
	import food from '../food/food.vue';
	const ERR_ON=0;
	export default{
		components:{
			shopping,
			cartcontrol,
			food
		},
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				goodsData:[],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
			}
		},
		computed:{//计算属性
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];
					if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
						this.followScroll(i)
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let foods=[];
				this.goodsData.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food)
						}
					})
			    });
				return foods
			}
	    },		
		created(){
			this.classMap=["decrease","discount","special",
			"invoice","guarantee"]
			this.$http.get('/api/goods').then((res)=>{
		    	res=res.body;
		   	    if(res.errno===ERR_ON){
			   	    this.goodsData=res.data;
			   	    this.$nextTick(()=>{
			   	    	this.initScroll()
			   	    	this.creatHeight()
			   	    })
		   	    }
		    })
		},
		methods:{
			selectMenu(index, event) {
		        if (!event._constructed) {
		          return;
		        }
		        let foodList = this.$refs.foodList;
		        let el = foodList[index];
		        this.foodsScroll.scrollToElement(el, 300);
		    },
			selectMenu(index,event){
				if(!event._constructed){
					return;
				}
				let foodList=this.$refs.foodList;
				let el=foodList[index];
				this.foodsScroll.scrollToElement(el,300);
			},		
			selectFood(food,event){
				if(!event._constructed){
					return;
				}
				this.selectedFood=food;
				this.$refs.food.show()
			},
			addFood(target){
				this.drop(target);
			},
			drop(target){
				//体验优化 ，异步执行动画
				this.$nextTick(()=>{
		          this.$refs.shopping.drop(target);
		        });
			},
			initScroll(){
//				//左侧滑动
				this.meunScroll=new BScroll(this.$refs.menuWrapper, {
					click:true
				})
				//右侧滑动
				this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
					click:true,
					probeType:3 //滚动位置 监听位置
				});
				this.foodsScroll.on('scroll',(pos)=>{
					if(pos.y<=0){
						this.scrollY=Math.abs(Math.round(pos.y))
					}
					console.log(this.scrollY)
				})
			},
//			//获取每个food-list的高度
			creatHeight(){
				let foodList=this.$refs.foodList;
				let height=0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item=foodList[i]
					height+=item.clientHeight;
					this.listHeight.push(height)
				}
			},
			followScroll(index) {
		        let menuList = this.$refs.menuList;
		        let el = menuList[index];
		        this.meunScroll.scrollToElement(el, 300, 0, -100);
		    }
		}
	}
</script>

<style scoped>
	#goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
	}
	#goods .menu-wrapper{
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.menu-wrapper .menu-item{
		display: table;
		height: 54px;
		width: 56px;
		line-height: 14px;
		padding: 0 12px;
		text-align: center;
	}
	.menu-wrapper .menu-item.current{
		position: relative;
		z-index: 10;
		margin-top: -1px;
		background: #fff;
		font-weight: 700;
	}
	
	.menu-wrapper .menu-item .icon{
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 2px;
        margin-top: 2px;
	}
	.menu-wrapper .menu-item .text{
		display: table-cell;
		width: 56px;
		font-size: 12px;
		vertical-align: middle;
	    position: relative;
	    border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	#goods .foods-wrapper{
		flex:1
	}
	.foods-wrapper .title{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(147,153,159);
		background: #f3f5f7;
	}
	.foods-wrapper .food-item{
		display: flex;
		padding: 18px;
	}
	.menu-wrapper .menu-item:last-child .text,.menu-wrapper .menu-item.current .text{
		border:none;
		margin-bottom: 0;
	}
	.food-item .icon{
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.food-item .concent{
		flex: 1;
	}
	.content .name{
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.content .desc,.content .extra{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.content .desc{
		line-height: 14px;
		margin-bottom: 8px;
	}
	.content .extra{
		line-height: 10px;
	}
	.content .count{
		margin-right: 12px;
	}
	.content .price{
		font-weight: 700;
		line-height: 24px;
		
	}
	.content .cartconcontrol-wrapper{
		position: absolute;
		right: 0;
		bottom: 12px;
	}
	 .price .now{
	 	margin-right: 8px;
	 	font-size: 14px;
	 	color: rgb(240,20,20);
	 }
	.price .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159);
	} 
	/**/
	.menu-item .icon.decrease{
		background: url("decrease_3@2x.png") no-repeat;
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
			background-image: url("decrease_3@3x.png") no-repeat;
		}
		background-size: 12px 12px;
	}
	.menu-item .icon.discount{
		background: url("discount_3@2x.png") no-repeat;
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
			background-image: url("discount_3@3x.png") no-repeat;
		}
		background-size: 12px 12px;
	}
	.menu-item .icon.guarantee{
		background: url("guarantee_3@2x.png") no-repeat;
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
			background-image: url("guarantee_3@3x.png") no-repeat;
		}
		background-size: 12px 12px;
	}
	.menu-item .icon.invoice{
		background: url("invoice_3@2x.png") no-repeat;
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
			background-image: url("invoice_3@3x.png") no-repeat;
		}
		background-size: 12px 12px;
	}
	.menu-item .icon.special{
		background: url("special_3@2x.png") no-repeat;
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
			background-image: url("special_3@3x.png") no-repeat;
		}
		background-size: 12px 12px;
	}
</style>