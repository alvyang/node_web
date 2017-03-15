<template>
	<div class="order_page">
		<div class="receipt_address_div">
			<router-link tag="div" to="/address" v-show="!receiptAddress" class="no_receipt_address">您还没有设置收货地址，请设置</router-link>
			<router-link tag="div" to="/address" v-show="receiptAddress" class="receipt_address">
				<div class="name"><span>{{receiptAddress.name}}</span><span>{{receiptAddress.phone}}</span></div>
				<div class="address">{{receiptAddress.areaAddress}}{{receiptAddress.detailAddress}}</div>
			</router-link>
		</div>
	</div>
</template>
<script>
	export default({
		data(){
			return {
				receiptAddress:{
					id:"123",
					name:"吕扬",
					phone:"134****3525",
					areaAddress:"北京市海淀区",
					detailAddress:"14号楼7单元702室14号楼7单元702室14号楼7单元702室",
				},
			}
		},
		methods:{
			
		}
	})
</script>
<style scoped="scoped">
	.receipt_address{
		background:#ffffff url(../img/arrow_right.png) 9.2rem center no-repeat;
		background-size: 0.5rem auto;
		border-bottom: solid 1px #dddddd;
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
	}
	.order_page{
		background-color: #f4f4f4;
		height: 10rem;
	}
</style>