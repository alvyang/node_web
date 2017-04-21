<template>
	<div class="personal_cart">
		<div class="personal_message">
			<div class="personal_head">
				<img :src="user.headimgurl"/>
			</div>
			<div class="personal_detail">
				<a class="nickname">{{user.nickname}}</a>
				<a class="integer">0 积分</a>
				<!--<a class="rmb">¥0.00</a>-->
			</div>
		</div>
		<!--<div class="personal_01">
			<div>
				<div class="num">2</div>
				<div class="name">商品收藏</div>
			</div>
			<div>
				<div class="num">3</div>
				<div class="name">优惠券</div>
			</div>
			<div>
				<div class="num">2</div>
				<div class="name">站内消息</div>
			</div>
			<div>
				<div class="num">0</div>
				<div class="name">我的咨询</div>
			</div>
		</div>-->
		<div class="order">
			<a>我的订单</a>
			<router-link to="/orders/1">查看全部订单</router-link>
		</div>
		<div class="order_detail">
			<router-link to="/orders/2">待付款<span v-show="orderNum.pendPay && orderNum.pendPay>0">{{orderNum.pendPay}}</span></router-link>
			<router-link to="/orders/3">待发货<span v-show="orderNum.pendDelivery && orderNum.pendDelivery>0">{{orderNum.pendDelivery}}</span></router-link>
			<router-link to="/orders/4">待收货<span v-show="orderNum.pendReceive && orderNum.pendReceive>0">{{orderNum.pendReceive}}</span></router-link>
			<router-link to="/orders/5">待评价<span v-show="false"></span></router-link>
		</div>
	</div>
</template>
<script>
	export default({
		data(){
			return {
				orderNum:{
					pendPay:0,
					pendDelivery:0,
					pendReceive:0,
				},
				user:{}
			}
		},
		methods:{
			getOrderNum(){
				var _self = this;
				$.ajax({
					type: "post",
					url: "/inter/order/getOrderNum",
					data:{open_id:sessionStorage["open_id"]},
					success: function(res) {
						console.log(res);
						if(res.code == "000000"){
							_self.orderNum = res.data;
						}
					}
				});
			}
		},
		activated(){
			this.getOrderNum();
		},
		mounted(){
			var _self = this;
			$.ajax({
				type: "post",
				url: "/inter/wechat/getUserMesage",
				data:{openId:sessionStorage["open_id"]},
				success: function(res) {
					console.log(res);
					if(res.code == "000000"){
						_self.user = res.data;
					}
				}
			});
			//this.getOrderNum();
		}
	})
</script>
<style>
	.personal_message{
		background: -webkit-gradient(linear,left top, right bottom, from(#2b9bd3), to(#2acbf6));
		height: 4rem;
		box-sizing: border-box;
		padding-top: 0.6rem;
	}
	.personal_message .personal_detail{
		text-align: center;
		color: #ffffff;
		margin-top: 0.3rem;
		font-size: 0.4rem;
	}
	.personal_message .nickname{
		background: url(../img/nickname.png) left center no-repeat;
		background-size: 0.4rem auto;
		padding-left: 0.45rem;
		padding-right: 0.3rem;
	}
	.personal_detail .integer{
		background: url(../img/integral.png) left center no-repeat;
		background-size: 0.4rem auto;
		padding-left: 0.45rem;
		padding-right: 0.3rem;
	}
	.personal_detail .rmb{
		background: url(../img/rmb.png) left center no-repeat;
		background-size: 0.35rem auto;
		padding-left: 0.45rem;
		padding-right: 0.2rem;
	}
	.personal_message .personal_head{
		background:#ffffff;
		border-radius: 50%;
		width: 2.1rem;
		height: 2.1rem;
		margin-left: auto;
		margin-right: auto;
	}
	.personal_message .personal_head img{
		border-radius: 50%;
		margin-left: 0.1rem;
		margin-top: 0.1rem;
		width: 1.9rem;
		height: 1.9rem;
	}
	.order_detail{
		background: #ffffff;
		font-size: 0;
		border-bottom: solid 1px #dddddd;
	}
	.order_detail a{
		position: relative;
		width: 25%;
		height: 2.5rem;
		line-height: 3.6rem;
		font-size: 0.35rem;
		color: #666666;
		text-align: center;
		display: inline-block;
		text-decoration: none;
	}
	.order_detail a:nth-child(1){
		background: url(../img/payment.png) center 0.2rem no-repeat;
		background-size: 1.3rem auto;
	}
	.order_detail a:nth-child(2){
		background: url(../img/deliver.png) center 0.3rem no-repeat;
		background-size: 1.1rem auto;
	}
	.order_detail a:nth-child(3){
		background: url(../img/receive.png) center 0.3rem no-repeat;
		background-size: 1.2rem auto;
	}
	.order_detail a:nth-child(4){
		background: url(../img/evaluate.png) center 0.3rem no-repeat;
		background-size: 1.2rem auto;
	}
	.order_detail a span{
		background-color: #d81e06;
		display: inline-block;
		position: absolute;
		top: 0.3rem;
		right: 0.6rem;
		width: 0.35rem;
		height: 0.35rem;
		line-height: 0.35rem;
		text-align: center;
		font-size: 0.2rem;
		border-radius: 50%;
		color: #ffffff;
	}
	.order{
		position: relative;
		background: #ffffff;
		margin-top: 0.2rem;
		height: 1.2rem;
		line-height: 1.2rem;
		border-bottom: solid 1px #dddddd;
	}
	.order a:nth-child(1){
		background: url(../img/order.png) 0.25rem center no-repeat;
		background-size: 0.5rem auto;
		padding-left: 1rem;
	}
	.order a:nth-child(2){
		background: url(../img/arrow_right.png) right center no-repeat;
		background-size: 0.5rem auto;
		position: absolute;
		right: 0.25rem;
		height: 100%;
		color: #bfbfbf;
		padding-right: 0.5rem;	
		display: inline-block;
		width: 6rem;
		text-align: right;	
	}
	.order a{
		display: inline-block;
		text-decoration: none;
		font-size: 0.34rem;
		color: #333333;
	}
	.personal_cart{
		box-sizing: border-box;
		border: solid 1px #f4f4f4;
		background-color: #f4f4f4;
		height: 100%;
	}
	.personal_01{
		background-color: #ffffff;
		box-sizing: border-box;
		font-size: 0;
		margin-top: 0.2rem;
	}
	.personal_01 .num{
		margin-top: 0.4rem;
	}
	.personal_01 .name{
		padding-top: 0.3rem;
	}
	.personal_01 > div{
		display: inline-block;
		width: 25%;
		height: 2rem;
		font-size: 0.35rem;
		color: #666666;
		box-sizing: border-box;
		text-align: center;
	}
</style>