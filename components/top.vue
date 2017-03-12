<template>
	<div>
		<div class="top_01">
			<jf-logo></jf-logo>
			<div class="search_div" @click="searchShow">
				<img src="../img/search.png" class="search_img" />
			</div>
			<a class="top_button">
				<span class="follow" @click="followWechat">关注</span>
				<span class="gap">|</span>
				<span class="record">我的记录</span>
			</a>
		</div>
		<jf-mask v-show="follow.mask" :mask = "follow"></jf-mask>
		<div v-show="follow.mask" class="qrcode_div">
			<img src="../img/qrcode.png"/>
			<div>长按图片【识别二维码】关注公众号</div>
		</div>
	</div>
</template>
<script>
	import Logo from "components/logo.vue";
	import Mask from "components/mask.vue";
	export default({
		data(){
			return {
				follow:{
					mask:false,
				}
			}
		},
		methods:{
			searchShow(){
				
			},
			followWechat(){
				this.follow.mask = true;
			}
		},
		components:{
			"jf-logo":Logo,
			"jf-mask":Mask,
		}
	});
</script>
<style>
	.qrcode_div{
		position: absolute;
		width: 6.4rem;
		left: 1.8rem;
		top: 3rem;
		text-align: center;
		z-index: 101;
	}
	.qrcode_div img{
		width: 6rem;
		height: 6rem;
	}
	.qrcode_div > div{
		color: #ffffff;
		font-size: 0.4rem;
		margin-top: 0.5rem;
	}
	.top_01{
		position: relative;
		box-sizing: border-box;
		width: 10rem;
		height: 0.933333rem;
		line-height: 0.933333rem;
		background-color: #1e1d22;
		color: #999999;
		padding-left: 0.25rem;
		padding-right: 0.25rem;
	}
	.search_div {
		position: absolute;
		right:2.8rem;
		display: inline-block;
		width: 2rem;
		text-align: right;
	}
	.top_01 .search_img{	
		width:0.32rem;
		height: 0.32rem;
		vertical-align: middle;
	}
	.top_button {
		position: absolute;
		right: 0.25rem;
	}
	.top_01 .follow,.top_01 .gap,.top_01 .record{
		display: inline-block;
		vertical-align: middle;
	}
</style>