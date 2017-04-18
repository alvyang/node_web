<template>
	<div>
		<div class="swiper-container">
		  	<div class="swiper-wrapper">
  				<div class="swiper-slide" v-for="c in commodityImage">
			    		<img :src="c.source" />
		  		</div>
		  	</div>
		</div>
		<div class="commodity_message">
			<div class="name">{{commodity.full_name}}</div>
			<div class="description">{{commodity.memo}}</div>
			<div class="price">¥ {{commodity.price}} 元</div>
		</div>
		<div class="commodity_description" v-html="commodity.introduction"></div>
		<div style="height: 1.4rem;"></div>
		<div class="commodity_operation">
			<a class="attend">收藏</a>
			<router-link to="/shoppingcart/2" class="shopping_cart">购物车</router-link>
			<a class="add_cart" @click.prevent="addToCart(commodity.id)">加入购物车</a>
		</div>
		<jf-prompt :message="message"></jf-prompt>
	</div>
</template>
<script>
	import Swiper from "swiper";
	import Prompt from "components/prompt.vue";
	require("swiper/dist/css/swiper.min.css");
	export default({
		data(){
			return {
				message:"",
				commodity:{},
				commodityImage:[],
			}
		},
		methods:{
			addToCart(id){
				var _self = this;
				var data = {
					openid:sessionStorage["open_id"],
					cartItem:{
						quantity:1,
						product_id:id
					}
				};
				$.ajax({
					type: "post",
					url: "/inter/cart/addCart",
					data:data,
					success: function(res) {
						console.log(res);
						if(res.code == "000000"){
							_self.message = res.message;
						}
					}
				});
			},
			getCommodityMessage(){
				var _self = this;
				$.ajax({
					type: "post",
					url: "/inter/products/getProductMessage",
					data:{id:_self.$route.params.id},
					success: function(res) {
						console.log(res);
						if(res.code == "000000"){
							_self.commodity = res.data[0];
							_self.commodityImage = res.data;
						}
					}
				});
			}
		},
		activated(){
			this.getCommodityMessage();
		},
		mounted(){
			//this.getCommodityMessage();
			setTimeout(function(){
				var mySwiper = new Swiper('.swiper-container', {
					autoplay: 0,//可选选项，自动滑动
				})	
			},1000);
			
		},
		components:{
			"jf-prompt":Prompt,
		}
	})
</script>
<style>
	.commodity_description{
		background-color: #ffffff;
		margin-top: 0.2rem;
		box-sizing: border-box;
		padding: 0.4rem;
		max-height: 9999px;
		font-size: 0.4rem;
		line-height: 0.6rem;
	}
	.commodity_description img{
		width: 100% !important;
	}
	.commodity_operation{
		position: fixed;
		background-color: #ffffff;
		bottom: 0;
		width: 10rem;
		height: 1.35rem;
	}
	.commodity_operation .attend,.commodity_operation .shopping_cart{
		display: inline-block;
		width: 20%;
		height: 100%;
		line-height: 2.1rem;
		font-size: 0.3rem;
		text-align: center;
		color: #8a8a8a;
		text-decoration: none;
	}
	.commodity_operation .attend{
		background: url(../img/nav/collection.png) center 0.2rem no-repeat;
		background-size: 0.55rem auto;
	}
	.commodity_operation .shopping_cart{
		background: url(../img/nav/shopping_card.png) center 0.25rem no-repeat;
		background-size: 0.5rem auto;
	}
	.commodity_operation .add_cart{
		display: inline-block;
		width: 5rem;
		height: 100%;
		float: right;
		line-height: 1.35rem;
		font-size: 0.45rem;
		color: #ffffff;
		background-color: #d81e06;
		text-align: center;
	}
	.commodity_message{
		box-sizing: border-box;
		background-color: #ffffff;
		padding-left: 0.3rem;
		padding-right: 0.2rem;
		font-size: 0.45rem;
	}
	.commodity_message .name{
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
		color: #333333;
	}
	.commodity_message .description{
		color: #d81e06;
	}
	.commodity_message  .price{
		color: #d81e06;
		font-size: 0.45rem;
		margin-top: 0.2rem;
		padding-bottom: 0.3rem;
	}
	.swiper-container{
		margin-top: -1px;
		font-size: 0;
	}
	.swiper-slide img{
		width: 10rem;
	}
</style>