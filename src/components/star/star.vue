<template>
	<div class="star" :class="starType">
		<span v-for="(itemClass,index) in itemClasses" :class="itemClass"
			class="star-item" track-by="index"></span>
	</div>
</template>

<script>
	const length=5;
	const cls_on="on";
	const cls_half="half";
	const cls_off="off";
	export default{
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType(){
				return 'star-'+this.size
			},
			itemClasses(){
				let result=[];
				let score=Math.floor(this.score*2)/2;
				let hasDecimal=score%1!==0;
				let integer=Math.floor(score);
				for(let i=0;i<integer;i++){
					result.push(cls_on)
				}
				if(hasDecimal){
					result.push(cls_half)
				}
				while(result.length<length){
					result.push(cls_off)
				}
				return result;
			}
		}
	}
</script>

<style>
	.star{font-size: 0;}
	.star .star-item{
		display: inline-block;
		
	}
	.star.star-48 .star-item{
		width: 20px;
		height: 20px;
		margin-right: 22px;
	} 
	.star.star-48 .star-item:last-child{
		margin-right: 0;
	}
	.star.star-48 .star-item.on{
		background: url("star48_on@2x.png") no-repeat;
		background-size: 20px 20px;
	}
	.star.star-48 .star-item.half{
		background: url("star48_half@2x.png") no-repeat;
		background-size: 20px 20px;
	}
	.star.star-48 .star-item.off{
		background: url("star48_off@2x.png") no-repeat;
		background-size: 20px 20px;
	}
	.star.star-36 .star-item{
		width: 15px;
		height: 15px;
		margin-right: 6px;
	} 
	.star.star-36 .star-item.on{
		background: url("star36_on@2x.png") no-repeat;
		background-size: 15px 15px;
	}
	.star.star-36 .star-item.half{
		background: url("star36_half@2x.png") no-repeat;
		background-size: 15px 15px;		
	}
	.star.star-36 .star-item.off{
		background: url("star36_off@2x.png") no-repeat;
		background-size: 15px 15px;		
	}
    .star.star-24 .star-item{
		width: 10px;
		height: 10px;
		margin-right: 3px;
	} 
	.star.star-24 .star-item.on{
		background: url("star24_on@2x.png") no-repeat;
		background-size: 10px 10px;		
	}
	.star.star-24 .star-item.half{
		background: url("star24_half@2x.png") no-repeat;
		background-size: 10px 10px;		
	}
	.star.star-24 .star-item.off{
		background: url("star24_off@2x.png") no-repeat;
		background-size: 10px 10px;		
	}
</style>