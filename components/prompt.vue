<template>
	<div class="error_message"><div class="error">{{message}}</div></div>
</template>
<script>
	export default({
		data(){
			return {
				initTop:0
			};
		},
		mounted(){
			var mTop = $(".error_message").css("margin-top");
			this.initTop = parseFloat(mTop.substring(0,mTop.length-2));
			var _self = this;
			$(window).scroll(function(){
				var scrollTop = $(this).scrollTop();
				$(".error_message").css("margin-top",(_self.initTop+scrollTop)+"px");
			})
		},
		props:['message']
	});
</script>
<style>
	.error_message{
		position: absolute;
		margin-top: -0.87rem;
		top: 50%;
		height: 1.74rem;
		width: 10rem;
		text-align: center;
	}
	.error_message .error{
		display: inline-block;
		background-color: rgba(0,0,0,0.8);
		border-radius: 5px;
		line-height: 0.5rem;
		text-align: center;
		color: #ffffff;
		font-size: 0.389rem;
		padding-top: 0.4rem;
		padding-bottom: 0.4rem;
		padding-left: 0.4rem;
		padding-right: 0.4rem;
	}
</style>