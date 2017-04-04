<template>
	<div class="category_div">
		<jf-prompt :message="message"></jf-prompt>
		<div class="category_list">
			<i-scroll id="category_list">
				<a v-for="c in category" @click="getCategoryProducts(c.id)" :class="['category_item',{category_item_current:c.id == currentId}]">{{c.name}}</a>
			</i-scroll>
		</div>
		<div class="product_list">
			<i-scroll id="product_list">
				<router-link :to="{path:'/commodity',name:'commodity',params:{id:p.id}}" tag="div"  v-for="p in product" class="category_product_list">
					<img :src="p.image" class="product_img"/>
					<span class="product_name">{{p.name}}</span>
					<span class="product_price">¥ {{p.price}}</span>
					<img src="../img/shopping_cart.png" class="add_cart" @click.prevent="addToCart(p.id)"/>
				</router-link>
			</i-scroll>
		</div>
	</div>
</template>
<script>
	import scroll from "components/scroll.vue";
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
			this.getCategoryList();
			$(".category_div").height($(window).height());
		},
		components:{
			"i-scroll":scroll,
			"jf-prompt":Prompt,
		}
	})
</script>
<style>
	.category_product_list{
		background: #ffffff;
		width: 100%;
		height: 3.2rem;
		position: relative;
		margin-bottom: 0.25rem;
	}
	.category_product_list .product_img{
		margin-top: 0.1rem;
		width: 3rem;
		height: 3rem;
	}
	.category_product_list .add_cart{
		position: absolute;
		left: 5.5rem;
		top: 1.9rem;
		width: 0.7rem;
		height: 0.7rem;
		margin-right: 0.3rem;
	}
	.product_name{
		position: absolute;
		left: 3rem;
		width: 3.5rem;
		padding-top: 0.5rem;
		top: 0px;
		box-sizing: border-box;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.product_price{
		position: absolute;
		left: 3rem;
		top: 2rem;
		font-size: 0.4rem;
		width: 3.5rem;
		color: #d81e06;
	}
	.product_list{
		position: relative;
		left: 3rem;
		top: 0;
		width: 7rem;
		height: 100%;
		box-sizing: border-box;
		padding-bottom: 1.35rem;
		padding-left: 0.25rem;
		padding-right: 0.25rem;
		padding-top: 0.25rem;
		
	}
	.category_list{
		position: absolute;
		left: 0;
		width: 3rem;
		height: 100%;
		box-sizing: border-box;
		padding-bottom: 1.35rem;
		border-right: solid 1px #cccccc;
	}
	.category_item{
		background-color: #ffffff;
		border-right: solid 1px #cccccc;
		border-bottom: solid 1px #cccccc;
		display: block;
		height: 1.5rem;
		width: 100%;
		line-height: 1.5rem;
		text-align: center;
		text-decoration: none;
	}
	.category_item_current{
		 color: #d81e06;
	}
	.category_div{
		position: relative;
		box-sizing: border-box;
		width: 10rem;
	}
</style>