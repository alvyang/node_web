<template>
	<div>
		<div class="commodity_list">
			<router-link to="/commodity" tag="div" v-for="c in commodityList" class="commodity_item">
				<img :src="c.commodityUrl" />
				<div class="commodity_name">{{c.commodityName}}</div>
				<div class="commodity_cart">
					<span class="commodity_price">¥{{c.commodityPrice}}</span>
					<img src="../img/shopping_cart.png" @click.prevent="addToCart"/>
				</div>
			</router-link>
		</div>
		<jf-prompt :message="message"></jf-prompt>
		<div style="height: 1.35rem;"></div>
	</div>
</template>
<script>
	import Prompt from "components/prompt.vue";
	export default({
		data(){
			return {
				message:"",
				commodityList:[{
					commodityName:"山西特产宁化府益源庆名醋山西特产宁化府益源庆名醋2400ml（31.8元）",
					commodityPrice:52.48,
					commodityUrl:"img/logo.jpg",
					commodityDesc:"宁化府益源庆名醋纯粮酿造，甜、绵、酸、香浓、高质量，誉满全国，经久不衰。",
				},{
					commodityName:"山西特产宁化府益源庆名醋山西特产宁化府益源庆名醋2400ml（31.8元）",
					commodityPrice:52.48,
					commodityUrl:"img/logo.jpg",
					commodityDesc:"宁化府益源庆名醋纯粮酿造，甜、绵、酸、香浓、高质量，誉满全国，经久不衰。",
				},{
					commodityName:"山西特产宁化府益源庆名醋山西特产宁化府益源庆名醋2400ml（31.8元）",
					commodityPrice:52.48,
					commodityNum:1,
					commodityUrl:"img/logo.jpg",
					commodityDesc:"宁化府益源庆名醋纯粮酿造，甜、绵、酸、香浓、高质量，誉满全国，经久不衰。",
				},{
					commodityName:"山西特产宁化府益源庆名醋山西特产宁化府益源庆名醋2400ml（31.8元）",
					commodityPrice:52.48,
					commodityNum:1,
					commodityUrl:"img/logo.jpg",
					commodityDesc:"宁化府益源庆名醋纯粮酿造，甜、绵、酸、香浓、高质量，誉满全国，经久不衰。",
				}]
			}
		},
		methods:{
			addToCart(){
				var _self = this;
				this.message = "该商品已添加到购物车";
			}
		},
		components:{
			"jf-prompt":Prompt,
		}
	})
</script>
<style>
	.commodity_item{
		display: inline-block;
		box-sizing: border-box;
		background-color: #ffffff;
		width: 4.85rem;
		height: 7.3rem;
		margin-left: 0.1rem;
		margin-right: 0.05rem;
		margin-bottom: 0.15rem;
	}
	.commodity_item .commodity_cart{
		margin-top: 0.3rem;
	}
	.commodity_item .commodity_cart img{
		float: right;
		width: 0.7rem;
		height: 0.7rem;
		margin-right: 0.3rem;
	}
	.commodity_item .commodity_price{
		box-sizing: border-box;
		color: #d81e06;
		font-size: 0.4rem;
		padding-left: 0.15rem;
		padding-right: 0.15rem;
	}
	.commodity_item .commodity_name{
		box-sizing: border-box;
		padding-left: 0.15rem;
		padding-right: 0.15rem;
		font-size: 0.4rem;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.commodity_item img{
		width: 100%;
	}
	.commodity_list{
		background-color: #f4f4f4;
		font-size: 0;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
	}
</style>