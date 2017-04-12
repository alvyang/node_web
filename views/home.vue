<template>
	<div class="home_page">
		<jf-top></jf-top>
		<div class="swiper-container">
		  	<div class="swiper-wrapper">
		    	<div class="swiper-slide">
		    		<img src="../img/swiper01.jpg" />
		    	</div>
		    	<div class="swiper-slide">
		    		<img src="../img/swiper02.jpg" />
		    	</div>
		  	</div>
		</div>
		<div class="commodity_list">
			<router-link :to="{path:'/commodity',name:'commodity',params:{id:c.id}}" v-show="c.is_list.data[0] == 1" tag="div" v-for="c in commodityList" class="commodity_item">
				<img :src="c.image" />
				<div class="commodity_name">{{c.full_name}}</div>
				<div class="commodity_cart">
					<span class="commodity_price">¥{{c.price}}</span>
					<img src="../img/shopping_cart.png" @click.prevent="addToCart(c.id)"/>
				</div>
			</router-link>
		</div>
		<jf-prompt :message="message"></jf-prompt>
		<div style="height: 1.35rem;"></div>
	</div>
</template>
<script>
	import Top from "components/top.vue";
	import swiper from "swiper";
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
					openid:_self.$store.state.openid,
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
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 2000,//可选选项，自动滑动
			})
		},
		components:{
			"jf-top":Top,
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
		vertical-align: middle;
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