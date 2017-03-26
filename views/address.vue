<!--
	作者：626183528@qq.com
	时间：2017-03-15
	描述：收获地址列表页面
-->
<template>
	<div>
		<jf-no-content v-show="receivers.length == 0" message="您还没有收货地址"></jf-no-content>
		<div v-for="(a,index) in receivers" class="address_item">
			<div class="address_content" @click="selectAddress(index)">
				<div class="name"><a>{{a.consignee}}</a><a>{{a.phone}}</a></div>
				<div class="address">{{a.area_name}}{{a.address}}</div>
			</div>
			<div class="address_edit" @click="addressEdit(index)"></div>
		</div>
		<router-link tag="div" to="/address_edit" class="add_address_button" >新增收获地址</router-link>
	</div>
</template>
<script>
	import NoContent from "components/no_content.vue";
	export default({
		data(){
			return{
				receivers:[]
			}
		},
		activated(){
			this.getReceiverList();
		},
		mounted(){
			this.getReceiverList();
		},
		methods:{
			getReceiverList(){
				var _self = this;
				$.ajax({
					type: "post",
					url: "/inter/receiver/getReceiverList",
					data:{openId:_self.$store.state.openid},
					success: function(res) {
						console.log(res);
						if(res.code == "000000" && res.receivers){
							_self.receivers = res.receivers;
						}
					}
				});
			},
			selectAddress(index){
				sessionStorage["select_address"]=JSON.stringify(this.receivers[index]);
				this.$router.replace({path:"/order",query:this.receivers[index]});
			},
			addressEdit(index){
				sessionStorage["address_edit"] = JSON.stringify(this.receivers[index]);
				this.$router.push({path:"/address_edit"});
			}
		},
		components:{
			"jf-no-content":NoContent,
		}
	})
</script>
<style scoped="scoped">
	.address_item{
		font-size: 0;
		border-bottom: solid 1px #dddddd;
		padding-bottom: 0.35rem;
	}
	.address_item > div{
		display: inline-block;
	}
	.address_content{
		width: 9rem;
		font-size: 0.35rem;
	}
	.address_content .name{
		height: 1rem;
		line-height: 1rem;
		box-sizing: border-box;
		padding-left: 0.4rem;
		color: #333333;
	}
	.address_content .name a:nth-child(1){
		padding-right: 1rem;
	}
	.address_content .address{
		box-sizing: border-box;
		padding-left: 0.4rem;
		color: #999999;
		padding-right: 0.4rem;
		
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.address_edit{
		background: url(../img/edit.png) left center no-repeat;
		background-size: 0.6rem auto;
		width: 1rem;
		height: 1.6rem;
	}
	.add_address_button{
		background-color: #2b9bd3;
		width: 8rem;
		height: 1.1rem;
		line-height: 1.1rem;
		text-align: center;
		color: #ffffff;
		border-radius: 5px;
		margin-left: 1rem;
		font-size: 0.509rem;
		margin-top: 1rem;
	}
</style>