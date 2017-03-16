<template>
	<div>
		<jf-prompt :message="message"></jf-prompt>
		<div class="address_content">
			<div class="address_input">
				<span>收货人姓名</span>
				<input type="text" v-model="address.name" id="receiveName" placeholder="请输入收货人姓名"/>
			</div>
			<div class="address_input">
				<span>手机号码</span>
				<input type="text" v-model="address.phone" maxlength="11" placeholder="请输入您的手机号"/>
			</div>
			<div class="address_input">
				<span>配送区域</span>
				<input type="text" id="address" v-model="address.areaAddress" placeholder="请选择配送区域" readonly="readonly"/>
			</div>
			<div class="address_input" style="height: 1.8rem;">
				<span>详细地址</span>
				<textarea v-model="address.detailAddress" placeholder="请输入详情地址"></textarea>
			</div>
		</div>
		<div class="address_button" @click="saveAddress">保存地址</div>
	</div>
</template>
<script>
	import Prompt from "components/prompt.vue";
	import Address from "lib/address_select/js/address_select.js";
	require("lib/address_select/css/address_select.css");
	
	export default({
		data(){
			return {
				message:"",
				address:{
					id:"",
					name:"",
					phone:"",
					areaAddress:"",
					detailAddress:"",
				}
			}
		},
		mounted(){
			var address = new Address();
			address.init({
			    'trigger':'#address',
			    'data':"lib/address_select/db/address.json"//'数据'
			});
			
			var editAddress = this.$route.query;
			if(editAddress.id){
				this.address = editAddress;
			}
		},
		components:{
			"jf-prompt":Prompt,
		},
		methods:{
			verNull(arg,arg1){
				var _self = this;
				if(!arg){
					this.message = arg1;
					return false
				}else{
					return true;
				}
			},
			verPhoneNumber() {//校验手机号
				if (this.address.phone.match(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/g)) {
					return true;
				} else if(this.address.phone.indexOf("*") > -1){
					return true;
				}else{
					var _self = this;
					this.message = "请输入正确的手机号码！";
					return false
				}
			},
			saveAddress(){
				if(!this.verNull(this.address.name,"请输入收获人姓名") ||
				   !this.verPhoneNumber() ||
				   !this.verNull(this.address.areaAddress,"请选择配送区域") ||
				   !this.verNull(this.address.detailAddress,"请输入详细地址")){
					return;
				}
				this.$router.replace({path:"/address"});  
			}
		}
	})
</script>
<style scoped="scoped">
	.address_content{
		box-sizing: border-box;
		margin-top: 0.5rem;
		padding-left: 0.426rem;
		padding-right: 0.426rem;
	}
	.address_input{
		height: 0.92rem;
		border-bottom: solid 1px #999999;
		padding-top: 0.6rem;
		padding-bottom: 0.1rem;
	}
	.address_input span{
		display: inline-block;
		width: 2.237rem;
		padding-left: 0.13rem;
		margin-right: 0.152rem;
		color: #333333;
		font-size: 0.407rem;
		vertical-align: middle;
	}
	.address_input input,.address_input textarea{
		background-color: #f4f4f4;
		border: none;
		font-size: 0.407rem;
		height: 0.7rem;
		width: 6rem;
		vertical-align: middle;
	}
	.address_input textarea{
		height: 1.5rem;
		resize: none;
		padding-left: 0.2rem;
	}
	.address_button{
		background-color:#2b9bd3 ;
		border-radius: 4px;
		width: 8.796rem;
		height: 1.2rem;
		line-height: 1.2rem;
		margin-left: auto;
		margin-right: auto;
		color: #ffffff;
		text-align: center;
		font-size: 0.509rem;
		margin-top: 1.5rem;
	}
</style>