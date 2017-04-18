<template>
	<div>
		<div class="orders_bar">
			<router-link to="/orders/1" replace active-class="orders_type">全部</router-link>
			<router-link to="/orders/2" replace active-class="orders_type">待付款</router-link>
			<router-link to="/orders/3" replace active-class="orders_type">待发货</router-link>
			<router-link to="/orders/4" replace active-class="orders_type">待收货</router-link>
			<!--<router-link to="/orders/5" replace active-class="orders_type">待评价</router-link>-->
		</div>
		<jf-no-content v-show="orders.length == 0" message="您还没有相关订单"></jf-no-content>
		<div v-for="(o,index) in orders" class="orders_content">
			<div class="orders_code" @click="orderDetail(index)">
				<span>订单号：{{o.tracking_no}}</span>
				<span v-if="o.order_status == 2" class="order_state">已完成</span>
				<span v-else-if="o.payment_status == 0" class="order_state">待付款</span>
				<span v-else-if="o.shipping_status == 0" class="order_state">待发货</span>
				<span v-else-if="o.shipping_status == 2" class="order_state">待收货</span>
				<span v-else-if="o.order_status == 5" class="order_state">待评价</span>
			</div>
			<div class="orders_commodity" @click="orderDetail(index)">
				<img v-for="i in o.orderItem" :src="i.thumbnail" />
			</div>
			<div class="orders_operation">
				<a v-if="o.payment_status == 0">取消订单</a>
				<a v-if="o.payment_status == 0">支付订单</a>
			</div>
		</div>
	</div>
</template>
<script>
	import NoContent from "components/no_content.vue";
	export default({
		data(){
			return {
				orders:[]
			}
		},
		methods:{
			orderDetail(index){
				var orderDetail = this.orders[index];
				sessionStorage["order_detail_message"] = JSON.stringify(orderDetail);
				this.$router.push({path:"/orders_detail"});
			},
			getOrders(){
				var type = this.$route.params.type;
				var _self = this;
				$.ajax({
					type: "post",
					url: "/inter/order/getOrderList",
					data:{
						open_id:sessionStorage["open_id"],
						type:type,
						currentPage:1,
						pageSize:10,
					},
					success: function(res) {
						console.log(res);
						if(res.code == "000000"){
							_self.orders = res.data.list;
						}else if(res.code == "110000"){
							_self.orders = [];
						}
					}
				});
			}
		},
		watch:{
			'$route' (to, from) {
				this.getOrders();
			}
		},
		activated(){
			this.getOrders();
		},
		mounted(){
			//this.getOrders();
		},
		components:{
			"jf-no-content":NoContent
		}
	})
</script>
<style>
	.orders_content{
		background-color: #ffffff;
		height: 4.3rem;
		box-sizing: border-box;
		padding-left: 0.2rem;
		padding-right: 0.2rem;
		margin-top: 0.2rem;
	}
	.orders_content .orders_code{
		background: url(../img/order.png) 0.2rem center no-repeat;
		background-size: 0.4rem auto;
		height: 1rem;
		line-height: 1rem;
		box-sizing: border-box;
		padding-left: 0.7rem;
		color: #333333;
		font-size: 0.35rem;
		border-bottom: 1px solid #dddddd;
	}
	.orders_content .order_state{
		display: inline-block;
		color: #d81e06;
		float: right;
		box-sizing: border-box;
		padding-right: 0.3rem;
	}
	.orders_content .orders_commodity{
		height: 2rem;
		box-sizing: border-box;
		padding-left: 0.2rem;
		padding-right: 0.2rem;
		border-bottom: solid 1px #dddddd;
	}
	.orders_commodity img{
		width: 1.6rem;
		margin-top: 0.2rem;
	}
	.orders_operation a{
		display: inline-block;
		width: 2rem;
		height: 0.7rem;
		text-align: center;
		line-height: 0.7rem;
		float: right;
		margin-right: 0.2rem;
		text-decoration: none;
		margin-top: 0.3rem;
		border-radius: 5px;
		color: #333333;
		border: solid 1px #333333;
	}
	.orders_operation a:nth-child(1){
		color: #d81e06;
		border: solid 1px #d81e06;
	}
	.orders_bar{
		background-color: #ffffff;
		font-size: 0px;
		height: 1.1rem;
		line-height: 1.1rem;
		border-bottom: solid 1px #dddddd;
		box-sizing: border-box;
	}
	.orders_bar a{
		box-sizing: border-box;
		display: inline-block;
		width: 20%;
		height: 100%;
		text-align: center;
		color: #333333;
		font-size: 0.35rem;
		text-decoration: none;
	}
	.orders_type{
		border-bottom: solid 2px #1296db;
		color: #1296db !important;
	}
</style>