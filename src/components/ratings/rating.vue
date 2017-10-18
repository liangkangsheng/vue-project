<template>
	<div id="ratings" ref="ratings">
		<div class="ratings-concent">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
                <div class="overview-right">
                	<div class="scroe-wrapper">
                		<span class="title">服务态度</span>
                		<star :size="36" :score="seller.serviceScore"></star>
                		<span class="score">{{seller.serviceScore}}</span>
                	</div>
                	<div class="scroe-wrapper">
                		<span class="title">商品评分</span>
                		<star :size="36" :score="seller.foodScore"></star>
                		<span class="score">{{seller.foodScore}}</span>
                	</div>
                	<div class="delivery-wrapper">
                		<span class="title">送达时间</span><span class="delivery">{{seller.deliveryTime}}分钟</span>
                	</div>
                </div>
			</div>
			<split></split>
			<ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" 
			    	:desc="desc" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" class="rating-item boder-top" v-show="needShow(rating.rateTaye,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" alt="" width="28"/>
						</div>
						<div class="content">
						    <div class="name">{{rating.username}}</div>
						    <div class="star-wrapper">
						    	<star :size="24" :score="seller.score"></star>
						    	<span class="delivery" v-show="seller.deliveryTime">{{seller.deliveryTime}}</span>
						    </div>
						    <p class="text">{{rating.text}}</p>
						    <div class="recommend" v-show="rating.recommend && rating.recommend.length">
						    	 <span class="icomoon icon-thumb_up"></span><span v-for="item in rating.recommend" class="item">{{item}}</span>
						    </div>
                            <div class="time">{{rating.rateTime  | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import star from '../star/star.vue';
	import split from '../split/split.vue';
	import {formatDate} from '../../../src/assets/js/date.js';
	import ratingselect from '../ratingselect/ratingselect.vue';
	const ALL=2;
	const ERR_ON=0;
	export default{
		components:{
			star,
			split,
			ratingselect
		},
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
	        ratings: [],
	        selectType: ALL,
	        onlyContent: true,
		        desc: {
		          all: '全部',
		          positive: '推荐',
		          negative: '吐槽'
		        }
			}
		},
		created(){
			this.$http.get('/api/ratings').then(function(res){
		    	res=res.body;
		   	    if(res.errno===ERR_ON){
			   	    this.ratings=res.data;
                this.$nextTick(function(){
					this.scroll=new BScroll(this.$refs.ratings, {
						click:true
					})
				})

		   	    }
		    })
		},
		filters:{
	        formatDate(time){
		        let date=new Date(time);
		        return formatDate(date, 'yyyy-MM-dd hh:mm');
	        }
	    },
	    methods:{
	        needShow(type, text) {
		        if(this.onlyContent && !text){
		          return false;
		        }
		        if(this.selectType===ALL){
		          return true;
		        } else {
		          return type===this.selectType;
		        }
		    },
		    selectRating(type) {
		        this.selectType = type;
		        this.$nextTick(() => {
		          this.scroll.refresh();
		        });
		    },
		    toggleContent() {
		        this.onlyContent = !this.onlyContent;
		        this.$nextTick(() => {
		          this.scroll.refresh();
		        });
		    }
	    }
	}
</script>

<style scoped>
	#ratings {
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow:hidden;
	}
	#ratings .overview{
		display: flex;
		padding: 18px 0;
	}
	#ratings .rating-wrapper{
		padding: 0 18px;
	}
	.rating-wrapper .rating-item{
		display: flex;
		padding: 18px 0;
	}
	.rating-item .avatar{
		margin-right: 12px;
		flex: 0 0 28px;
		width: 28px;
	}
	.avatar img{
		border-radius: 50%;
	}
	.rating-item .content{
		position: relative;
		flex:1;
	}
	.content .name{
		margin-bottom: 4px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(7,17,27);
	}
	.content .star-wrapper{
		margin-bottom: 6px;
		font-size: 0;
	}
	.star-wrapper .star{
		display: inline-block;
		margin-right: 6px;
		vertical-align: top;
	}
	.star-wrapper .delivery{
		display: inline-block;
		vertical-align: top;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);		
	}
	#ratings .overview .overview-left{
		padding: 6px 0;
		flex: 0 0 137px;
		width:137px;
		border-right: 1px solid rgba(7,17,27,0.1);
		text-align:center;
		
	}
	.overview-left .score{
		margin-bottom: 6px;
		line-height: 28px;
		font-size: 28px;
		color: rgb(255,153,0);
	}
	.overview-left .title{
		margin-bottom: 8px;
		line-height: 12px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	.overview-left .rank{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	#ratings .overview .overview-right{
		flex: 1;
		padding:6px 0 6px 24px;
	}
	 .overview-right .scroe-wrapper{
	 	line-height: 18px;
	 	margin-bottom: 8px;
	 	font-size: 0;
	 }
	  .scroe-wrapper .title{
	  	line-height: 18px;
	  	display: inline-block;
	  	vertical-align: top;
	  	font-size: 12px;
	  	color: rgb(7,17,27);
	  }
    .scroe-wrapper .star{
    	display: inline-block;
    	margin: 0 12px;
    }
	 .scroe-wrapper  .score{
	 	line-height: 18px;
	 	display: inline-block;
	  	vertical-align: top;
	  	font-size: 12px;
	  	color: rgb(255,153,0);
	 } 
	.delivery-wrapper{
		font-size: 0;
		color: rgb(7,17,27);
	}   
	.delivery-wrapper .title{
		line-height: 18px;
	  	font-size: 12px;
	  	color: rgb(7,17,27);
	}
	.delivery-wrapper .delivery{
		margin-left: 12px;
		font-size: 12px;
		color: rgb(147,153,159);
	}
	.content .text{
		line-height: 18px;
		color: rgb(7,17,27);
		margin-bottom: 8px;
		font-size: 12px;
		
	}
	.content .recommend{
		line-height: 16px;
	}
	.content .recommend .icon-thumb_up, .content .recommend .item{
		display: inline-block;
		margin:0 8px 4px 0;
		font-size: 9px;
	}
	.content .recommend .icon-thumb_up{
		color:rgb(0,160,220);
	}
	.content .recommend .item{
		padding: 0 6px;
		border: 1px solid rgba(7,17,27,0.1);
		border-radius: 1px;
		color: rgb(147,153,159);
		background: #fff;
	}
	@media only screen and (max-width:320px){
		#ratings .overview .overview-left{
			flex:0 0 120px !important;
			width:120px !important;
		}
		#ratings .overview .overview-right{
			padding-left: 6px !important;
		}
		.scroe-wrapper .star{
			margin: 0 6px;
		}
	}
</style>