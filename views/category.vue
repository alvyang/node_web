<template>
	<div class="category_div">
		<jf-prompt :message="message"></jf-prompt>
		<div style="height: 1.2rem;"></div>
		<div class="category_list">
			<a v-for="c in category" @click="getCategoryProducts(c.id)" :class="['category_item',{category_item_current:c.id == currentId}]">{{c.name}}</a>
		</div>
		<div class="commodity_list">
			<router-link :to="{path:'/commodity',name:'commodity',params:{id:p.id}}" tag="div" v-for="p in product" class="commodity_item">
				<img :src="p.image" />
				<div class="commodity_name">{{p.full_name}}</div>
				<div class="commodity_cart">
					<span class="commodity_price">¥{{p.price}}</span>
					<img src="../img/shopping_cart.png" @click.prevent="addToCart(p.id)"/>
				</div>
			</router-link>
		</div>
		<div style="height: 1.35rem;"></div>
	</div>
</template>
<script>
	import Prompt from "components/prompt.vue";
	export default({
		data(){
			return{
				currentId:"",
				message:"",
				category:[],
				product:[]
			}
		},
		methods:{
			getCategoryList(){
				var _self = this;
				$.ajax({
					type: "post",
					url: "/inter/category/getCategoryList",
					success: function(res) {
						console.log(res);
						if(res.code == "000000"){
							_self.category = res.data.catagoryList;
							_self.currentId = res.data.catagoryList[0].id;
							_self.product = res.data.productList;
						}
					}
				});
			},
			getCategoryProducts(categoryId){
				var _self = this;
				this.currentId = categoryId;
				$.ajax({
					type: "post",
					url: "/inter/products/getProductByCategoryId",
					data:{categoryId:categoryId},
					success: function(res) {
						console.log(res);
						if(res.code == "000000"){
							_self.product = res.data;
						}
					}
				});
			},
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
		activated(){
			//this.getCategoryList();
		},
		mounted(){
			this.getCategoryList();
		},
		components:{
			"jf-prompt":Prompt,
		}
	})
</script>
<style>
	.category_item_current{
		height: 100%;
		box-sizing: border-box;
		border-bottom: solid 2px #d81e06;
	}
	.category_list{
		background-color: #ffffff;
		position: fixed;
		top: 0px;
		width: 10rem;
		height: 1.2rem;
		line-height: 1.2rem;
		font-size: 0.4rem;
		border-bottom: solid 1px #dddddd;
	}
	.category_list > a{
		display: inline-block;
		box-sizing: border-box;
		padding-left: 0.25rem;
		padding-right: 0.25rem;
		min-width: 3rem;
		text-align: center;
	}
	
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
		margin-top: -0.1rem;
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
		height: 1.2rem;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.commodity_item img{
		width: 4.45rem;
		margin: 0.2rem;
	}
	.commodity_list{
		background-color: #f4f4f4;
		font-size: 0;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
	}
</style>