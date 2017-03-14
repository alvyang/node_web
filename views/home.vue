<template>
	<div>
		<jf-top></jf-top>
		<div class="swiper-container">
		  <div class="swiper-wrapper">
		    	<div class="swiper-slide">
		    		<img src="../img/swiper01.jpg" />
		    	</div>
		    <div class="swiper-slide">
		    		<img src="../img/swiper02.jpg" />
		    </div>
		  </div>
		</div>
	</div>
</template>
<script>
	import Top from "components/top.vue";
	import swiper from "swiper";
	require("swiper/dist/css/swiper.min.css");
	export default({
		data(){
			return {}
		},
		mounted(){
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 2000,//可选选项，自动滑动
			})
		},
		components:{
			"jf-top":Top
		}
	})
</script>
<style>
	.swiper-container{
		margin-top: -1px;
	}
	.swiper-slide img{
		width: 10rem;
	}
</style>