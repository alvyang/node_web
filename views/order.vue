<template>
	<div class="order_page">
		<div class="receipt_address_div">
			<router-link tag="div" to="/address" v-show="!receiptAddress" class="no_receipt_address">您还没有设置收货地址，请设置</router-link>
			<div v-show="receiptAddress" class="receipt_address">
				
			</div>
		</div>
	</div>
</template>
<script>
	export default({
		data(){
			return {
				receiptAddress:null,
			}
		},
		methods:{
			
		}
	})
</script>
<style>
	.receipt_address{
		
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