<template>
	<div>
		<div class="orders_detail">
			<span>订单号：{{orderCode}}</span>
			<span v-if="orderState == 1" class="order_state">已完成</span>
			<span v-if="orderState == 2" class="order_state">待付款</span>
			<span v-if="orderState == 3" class="order_state">待发货</span>
			<span v-if="orderState == 4" class="order_state">待收货</span>
			<span v-if="orderState == 5" class="order_state">待评价</span>
		</div>
		<div class="receipt_address">
			<div class="name"><span>{{address.name}}</span><span>{{address.phone}}</span></div>
			<div class="address">{{address.areaAddress}}{{address.detailAddress}}</div>
		</div>
		<div v-for="c in commodity" class="order_commodity">
			<img :src="c.commodityUrl" />
			<div class="commodity_name">
				<div>{{c.commodityName}}</div>
				<div>数量：<a>{{c.commodityNum}}</a>价格：<a>¥ {{c.commodityPrice}}</a></div>
			</div>
		</div>
		<div class="orders_num_detail">
			<div class="commodity_num_price">商品总额<a>¥ {{orderPrice}}</a></div>
			<div class="freight">+ 运费<a>¥ 0.00</a></div>
			<div class="payment">实付款：<a>¥ {{orderPrice}}</a></div>
			<div class="order_time">下单时间：{{orderTime}}</div>
		</div>
		<div class="re_buy">
			<div>再次购买</div>
		</div>
	</div>
</template>
<script>
	export default({
		data(){
			return {
				orderCode:"123456789",
				orderState:"2",
				orderPrice:"100.00",
				orderTime:"2017-02-25 19:12:56",
				address:{
					id:"123",
					name:"吕扬",
					phone:"134****3525",
					areaAddress:"北京市海淀区",
					detailAddress:"14号楼7单元702室14号楼7单元702室14号楼7单元702室",
				},
				commodity:[{
					commodityName:"山西特产宁化府益源庆名醋山西特产宁化府益源庆名醋2400ml（31.8元）",
					commodityUrl:"img/logo.jpg",
					commodityNum:1,
					commodityPrice:52.48,
				},{
					commodityName:"山西特产宁化府益源庆名醋山西特产宁化府益源庆名醋2400ml（31.8元）",
					commodityUrl:"img/logo.jpg",
					commodityNum:1,
					commodityPrice:52.48,
				}]
			}
		}
	})
</script>
<style scoped="scoped">
	.re_buy{
		position: fixed;
		bottom: 0;
		height: 1.35rem;
		width: 10rem;
		background-color: #ffffff;
	}
	.re_buy > div{
		float: right;
		margin-top: 0.3rem;
		margin-right: 0.4rem;
		width: 2rem;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		border:solid 1px #d81e06;
		color: #d81e06 ;
		border-radius: 5px;
	}
	.orders_num_detail{
		background-color: #ffffff;
		margin-top: 0.2rem;
		box-sizing: border-box;
		padding:0.2rem 0.4rem;
		color: #333333;
	}
	.orders_num_detail .commodity_num_price{
		font-size: 0.4rem;
		height: 0.8rem;
		line-height: 0.8rem;
		
	}
	.orders_num_detail .freight{
		height: 0.7rem;
		border-bottom: solid 1px #dddddd;
	}
	.commodity_num_price a,.orders_num_detail .freight a{
		display: inline-block;
		float: right;
		color: #d81e06;
	}
	.orders_num_detail .payment,.orders_num_detail .order_time{
		text-align: right;		
	}
	.orders_num_detail .payment{
		font-size: 0.4rem;
		height: 0.8rem;
		line-height: 0.8rem;
	}
	.orders_num_detail .payment a{
		font-size: 0.45rem;
		color: #d81e06;
	}
	.orders_num_detail .order_time{
		font-size: 0.3rem;
		color: #c5c5c5;
		height: 0.6rem;
		line-height: 0.6rem;
	}
	.order_commodity{
		background-color: #ffffff;
		border-bottom: solid 1px #dddddd;
		height: 2.5rem;
		color: #333333;
		font-size: 0.35rem;
	}
	.order_commodity img{
		width: 2.3rem;
		height: 2.3rem;
		margin-top: 0.1rem;
		vertical-align: middle;
	}
	.order_commodity .commodity_name{
		width: 7.5rem;
		display: inline-block;
		box-sizing: border-box;
		padding-left: 0.2rem;
		padding-right: 0.2rem;
		vertical-align: middle;
		color: #333333;
	}
	.commodity_name > div:nth-child(1){
		overflow:hidden; 
		text-overflow:ellipsis;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.commodity_name > div:nth-child(2){
		margin-top: 0.2rem;
	}
	.commodity_name a{
		color: #d81e06;
		padding-right: 0.2rem;
		padding-left: 0.1rem;
	}
	.receipt_address{
		background:#ffffff;
		padding-bottom: 0.35rem;
		width: 10rem;
		font-size: 0.35rem;
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
	}
	.receipt_address .name{
		height: 1rem;
		line-height: 1rem;
		box-sizing: border-box;
		padding-left: 1rem;
		color: #333333;
	}
	.receipt_address .name span:nth-child(1){
		padding-right: 1rem;
	}
	.receipt_address .address{
		background: url(../img/address.png) 0.4rem center no-repeat;
		background-size: 0.45rem auto;
		box-sizing: border-box;
		padding-left: 1rem;
		color: #999999;
		padding-right: 0.5rem;
		
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	
	.orders_detail{
		background-color: #ffffff;
		height: 1rem;
		line-height: 1rem;
		box-sizing: border-box;
		padding-left: 0.4rem;
		padding-right: 0.4rem;
		font-size: 0.35rem;
		border-bottom: solid 1px #dddddd;
	}
	.orders_detail .order_state{
		display: inline-block;
		float: right;
		color: #d81e06;
	}
</style>