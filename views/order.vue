<template>
	<div>
		<jf-prompt :message="message"></jf-prompt>
		<div class="receipt_address_div">
			<router-link tag="div" to="/address" replace v-show="!receivers.consignee" class="no_receipt_address">您还没有设置收货地址，请设置</router-link>
			<router-link tag="div" to="/address" replace v-show="receivers.consignee" class="receipt_address">
				<div class="name"><span>{{receivers.consignee}}</span><span>{{receivers.phone}}</span></div>
				<div class="address">{{receivers.area_name}}{{receivers.address}}</div>
			</router-link>
			<img src="../img/address_bar.png" v-show="receivers" style="width:10rem"/>
		</div>
		<div class="order_commodity_title">订单商品信息</div>
		<div v-for="c in commodity" class="order_commodity">
			<img :src="c.commodityUrl" />
			<div class="commodity_name">{{c.commodityName}}</div>
			<div class="commodity_num">× {{c.commodityNum}}</div>
		</div>
		<div class="order_submit_div">
			<div class="order_price">
				<span>共<a style="color: #d81e06;">{{orderNum}}</a>件，</span>
				<span>合计：<a style="color: #d81e06;">¥{{orderPrice}}</a></span>
			</div>
			<div class="order_submit" @click="submitOrder">提交订单</div>
		</div>
	</div>
</template>
<script>
	import Prompt from "components/prompt.vue";
	export default({
		data(){
			return {
				orderNum:"",
				orderPrice:"",
				message:"",
				receivers:{
					consignee:"",
					area_name:"",
					address:"",
					phone:"",
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
		},
		destroyed(){
			sessionStorage["select_address"] = null
		},
		mounted(){
			var _self = this,selectAddress=null;
			if(sessionStorage["select_address"]){
				selectAddress = JSON.parse(sessionStorage["select_address"]);
			}
			if(!selectAddress){
				$.ajax({
					type: "post",
					url: "/inter/receiver/getDefaultReceiver",
					data:{openId:_self.$store.state.openid},
					success: function(res) {
						console.log(res);
						if(res.code == "000000" && res.receivers){
							_self.receivers = res.receivers;
						}
					}
				});
			}else{
				this.receivers = selectAddress;
			}
			
			var num = 0,price=0,l=this.commodity.length;
			for(var i = 0 ; i < l ;i++){
				num += this.commodity[i].commodityNum;
				price += this.commodity[i].commodityNum * this.commodity[i].commodityPrice;
			}
			this.orderNum = num;
			this.orderPrice = this.keepTwoDecimal(price);
		},
		methods:{
			submitOrder(){
				console.log(this.$store.state.openid);
				this.message = "微信支付";
			},
			keepTwoDecimal(num) {
				var result = parseFloat(num);
				if (isNaN(result)) {
					console.log('传递参数错误，请检查！');
					return false;
				}
			  	result = Math.round(num * 100) / 100;
			  	return result;
			}
		},
		components:{
			"jf-prompt":Prompt,
		}
	})
</script>
<style scoped="scoped">
	/*提交*/
	.order_submit_div{
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
		height: 1.35rem;
		font-size: 0;
		line-height: 1.35rem;
	}
	.order_submit_div .order_price{
		box-sizing: border-box;
		width: 7.5rem;
		height: 100%;
		color: #333333;
		text-align: right;
		padding-right: 0.4rem;
	}
	.order_submit_div .order_price span:nth-child(1){
		font-size: 0.35rem;
	}
	.order_submit_div .order_price span:nth-child(2){
		font-size: 0.4rem;
	}
	.order_submit_div .order_submit{
		width: 2.5rem;
		height: 100%;
		text-align: center;
		color: #ffffff;
		font-size: 0.4rem;
		background-color: #d81e06;
	}
	.order_submit_div > div{
		display: inline-block;
	}
	/*订单商品信息样式*/
	.order_commodity_title{
		background: url(../img/order.png) 0.4rem center no-repeat;
		background-size: 0.4rem auto;
		margin-top: 0.2rem;
		font-size: 0.4rem;
		box-sizing: border-box;
		padding-left: 1rem;
		background-color: #ffffff;
		height: 1rem;
		line-height: 1rem;
		color: #1296db;
		border-bottom: solid 1px #dddddd;
	}
	.order_commodity{
		background-color: #ffffff;
		border-bottom: solid 1px #dddddd;
		height: 2rem;
		color: #333333;
	}
	.order_commodity img{
		width: 1.8rem;
		height: 1.8rem;
		margin-top: 0.1rem;
		vertical-align: middle;
	}
	.order_commodity .commodity_name{
		display: inline-block;
		overflow:hidden; 
		text-overflow:ellipsis;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		width: 6.6rem;
		vertical-align: middle;
		box-sizing: border-box;
		padding-left: 0.2rem;
		font-size: 0.35rem;
	}
	.order_commodity .commodity_num{
		display: inline-block;
		width: 1rem;
		text-align: right;
		font-size: 0.35rem;
		vertical-align: middle;
	}
	/*收获地址样式*/
	.receipt_address_div{
		font-size: 0;
	}
	.receipt_address{
		background:#ffffff url(../img/arrow_right.png) 9.2rem center no-repeat;
		background-size: 0.5rem auto;
		padding-bottom: 0.35rem;
		width: 10rem;
		font-size: 0.35rem;
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
		padding-right: 1rem;
		
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.no_receipt_address{
		box-sizing: border-box;
		padding-left: 0.4rem;
		background:#ffffff url(../img/arrow_right.png) 9.2rem center no-repeat;
		background-size: 0.5rem auto;
		height: 1rem;
		line-height: 1rem;
		color: #333333;
		font-size: 0.35rem;
	}
</style>