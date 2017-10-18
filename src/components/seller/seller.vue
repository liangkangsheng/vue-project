<template>
	<div id="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc boder-top">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span><span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
		          <span class="icomoon icon-favorite" :class="{'active':favorite}"></span><span class="text">{{favoriteText}}</span>
		        </div>
			</div>
			<split></split>
			<div class="bulletin">
				<div class="title">公告与活动</div>
			    <div class="content-wrapper boder-top">
			    	<p class="content">{{seller.bulletin}}</p>
			    </div>
			    <ul v-if="seller.supports" class="supports">
					<li class="support-item boder-top" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
		        <h1 class="title">商家实景</h1>
		        <div class="pic-wrapper" ref="picWrapper">
		          <ul class="pic-list" ref="picList">
		            <li class="pic-item" v-for="pic in seller.pics">
		              <img :src="pic" width="120" height="90">
		            </li>
		          </ul>
		        </div>
		    </div>
		    <split></split>
		    <div class="info">
		        <h1 class="title boder-top">商家信息</h1>
		        <ul>
		          <li class="info-item boder-top" v-for="info in seller.infos">{{info}}</li>
		        </ul>
		    </div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import star from '../star/star.vue';
	import split from '../split/split.vue';
	import {saveToLocal, loadFromLocal} from '../../../src/assets/js/store.js';
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			star,
			split
		},
		data(){
			return{
				favorite:(()=>{
			        return loadFromLocal(this.seller.id, 'favorite', false);
			    })()
			}
		},
		created(){
	    	this.classMap=["decrease","discount","special","invoice","guarantee"]
	        
		},
	    watch: {
	      'seller'() {
	        this.$nextTick(function(){
	          this.initScroll();
	          this.initPics();
	        });
	      }
	    },
	    computed: {
	      favoriteText() {
	        return this.favorite ? '已收藏' : '收藏';
	      }
	    },
	    methods: {
	        toggleFavorite(event) {
		        if (!event._constructed) {
		          return;
		        }
		        this.favorite = !this.favorite;
		        saveToLocal(this.seller.id, 'favorite', this.favorite);
	        },
	        initScroll() {
		        if (!this.scroll) {
		          this.scroll = new BScroll(this.$refs.seller, {
		          	 // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
		            click: true
		          });
		        } else {
		          this.scroll.refresh();
		        }
	        },
	        initPics() {
		        if (this.seller.pics) {
		          let picWidth = 120;
		          let margin = 6;
		          let width = (picWidth + margin) * this.seller.pics.length - margin;
		          this.$refs.picList.style.width = width + 'px';
		          this.$nextTick(function(){
		            if (!this.picScroll) {
		              this.picScroll = new BScroll(this.$refs.picWrapper, {
		                scrollX: true,
		                eventPassthrough: 'vertical'
		              });
		            } else {
		              this.picScroll.refresh();
		            }
		          });
		        }
		    }
		},
	    mounted() {
	      this.$nextTick(function(){
	        this.initScroll();
	        this.initPics();
	      });
	    }
    }
</script>

<style scoped>
	#seller{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow:hidden;
	}
	#seller .overview{
		padding: 18px;
	}
	#seller .bulletin{
		padding:18px 18px 0 18px;
	}
	.bulletin .content-wrapper{
		padding: 0 12px 16px 12px;
		overflow: hidden;
	}
	.content-wrapper .content{
		line-height: 24px;
		font-size: 12px;
		color: rgb(240,20,20);
	}
	.overview .title,#seller .title{
		margin-bottom: 8px;
		line-height: 14px;
		color: rgb(7,17,27);
		font-size: 14px;
	}
	.overview .desc{
		padding-bottom: 18px;
		font-size: 0;
	}
	.overview .remark{
		display: flex;
		padding-top: 18px;
	}
    .remark .block{
    	flex: 1;
    	text-align: center;
    	border-right: 1px solid rgb(7,17,27);
    }	
    .remark .block:last-child{
    	border: none;
    } 
    .remark .block h2{
    	margin-bottom: 4px;
    	line-height: 10px;
    	font-size: 10px;
    	color:rgb(147,153,159);
    }
    .remark .block .content{
    	color:rgb(7,17,27);
    	line-height: 24px;
    	font-size: 10px;
    }
     .content .stress{
     	font-size: 14px;
     }
	.desc .star{
		display: inline-block;
		margin-right: 8px;
		vertical-align: top;
	}
	.desc .text{
		margin-right: 12px;
		display: inline-block;
		line-height: 18px;
		vertical-align: top;
		font-size: 10px;
		color: rgb(77,85,93);
	}
	.supports .support-item{
		padding: 16px 12px;
		font-size: 0;
	}
	.supports .support-item:last-child{
		border:none
	}
	.supports .support-item .icon{
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		margin-right: 6px;
	}
	.supports .support-item .text{
		line-height: 16px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	.pics{
		padding: 18px;
	}
	
	.pics .title{
		margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
	}
	.pics .pic-wrapper{
		width: 100%;
        overflow: hidden;
        white-space: nowrap;
	}
	.pic-wrapper .pic-list{
		font-size: 0;
	}
	.pic-list .pic-item{
		display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
	}
	.pic-list .pic-item:last-child{
		margin: 0;
	}
	.info{
        padding: 18px 18px 0 18px;
        color: rgb(7, 17, 27);	
    }
    .info .title{
        padding-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
    }
    .info .info-item{
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
    }
    .info .info-item:last-child{
    	border:none;
    }
    /*收藏*/
    .favorite{
    	position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
    }
    .favorite .icon-favorite{
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;
    }     
    .favorite .icon-favorite.active{
    	color: rgb(240, 20, 20)
    }
    .favorite .text{
      line-height: 10px;
      font-size: 10px;
      color: rgb(77, 85, 93);  	
    }
	.supports .support-item .icon.decrease{
		background: url("decrease_4@2x.png") no-repeat;
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
			background-image: url("decrease_4@3x.png") no-repeat;
		}
		background-size: 16px 16px;
	}
	.supports .support-item .icon.discount{
		background: url("discount_4@2x.png") no-repeat;
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
			background-image: url("discount_4@3x.png") no-repeat;
		}
		background-size: 16px 16px;
	}
	.supports .support-item .icon.guarantee{
		background: url("guarantee_4@2x.png") no-repeat;
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
			background-image: url("guarantee_4@3x.png") no-repeat;
		}
		background-size: 16px 16px;
	}
	.supports .support-item .icon.invoice{
		background: url("invoice_4@2x.png") no-repeat;
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
			background-image: url("invoice_4@3x.png") no-repeat;
		}
		background-size: 16px 16px;
	}
	.supports .support-item .icon.special{
		background: url("special_4@2x.png") no-repeat;
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3) {
			background-image: url("special_4@3x.png") no-repeat;
		}
		background-size: 16px 16px;
	}
</style>