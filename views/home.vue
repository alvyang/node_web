<template>
	<div class="home_page">
		<jf-top></jf-top>
		<div class="swiper-container" id="home_swiper">
		  	<div class="swiper-wrapper">
		    	<div class="swiper-slide">
		    		<img src="../img/swiper01.jpg" />
		    	</div>
		    	<div class="swiper-slide">
		    		<img src="../img/swiper02.jpg" />
		    	</div>
		  	</div>
		  	<div class="swiper-pagination"></div>
		</div>
		<router-link :to="{path:'/commodity',name:'commodity',params:{id:c.id}}" tag="div" v-for="c in commodityList" class="commodity_home_item">
			<img :src="c.image" class="commodity_home_img"/>
			<div class="commodity_home_name">{{c.full_name}}</div>
			<div class="commodity_home_cart">
				<span class="commodity_home_price">¥{{c.price}}</span>
				<img src="../img/shopping_cart.png" @click.prevent="addToCart(c.id)"/>
			</div>
		</router-link>
		<jf-prompt :message="message"></jf-prompt>
		<div style="height: 1.35rem;"></div>
	</div>
</template>
<script>
	import Top from "components/top.vue";
	import swiper from "swiper/dist/js/swiper.min.js";
	import Prompt from "components/prompt.vue";
	require("swiper/dist/css/swiper.min.css");
	
	export default({
		data(){
			return {
				message:"",
				commodityList:[]
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
			}
		},
		mounted(){
			var _self = this;
			$.ajax({
				type: "post",
				url: "/inter/products/getProductsList",
				success: function(res) {
					console.log(res);
					if(res.code == "000000"){
						_self.commodityList = res.data;
					}
				}
			});
			var mySwiper = new Swiper('#home_swiper', {
				autoplay: 2000,//可选选项，自动滑动
				pagination : '.swiper-pagination',
			})
		},
		components:{
			"jf-top":Top,
			"jf-prompt":Prompt,
		}
	})
</script>
<style>
	.commodity_home_item{
		background-color: #ffffff;
		position: relative;
		width: 10rem;
		height: 3rem;
		box-sizing: border-box;
		padding: 0.2rem;
		margin-top: 0.2rem;
	}
	.commodity_home_item .commodity_home_img{
		height: 100%;
	}
	.commodity_home_item .commodity_home_name{
		position: absolute;
		left: 3rem;
		top: 0.4rem;
		width: 7rem;
		box-sizing: border-box;
		padding-left: 0.15rem;
		padding-right: 0.15rem;
		font-size: 0.4rem;
		height: 1.2rem;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.commodity_home_item .commodity_home_cart{
		position: absolute;
		left: 3rem;
		top: 2rem;
		width: 7rem;
	}
	.commodity_home_item .commodity_home_cart .commodity_home_price{
		box-sizing: border-box;
		color: #d81e06;
		font-size: 0.4rem;
		padding-left: 0.15rem;
		padding-right: 0.15rem;
	}
	.commodity_home_item .commodity_home_cart img{
		float: right;
		width: 0.7rem;
		height: 0.7rem;
		margin-right: 0.3rem;
	}
	.home_page{
		height: 100%;
	}
	.swiper-container{
		margin-top: -1px;
		font-size: 0;
	}
	.swiper-slide img{
		width: 10rem;
	}
</style>