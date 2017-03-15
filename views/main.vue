<template>
	<div>
		<div class="main_content">
			<keep-alive><router-view class="view"></router-view></keep-alive>
		</div>
		<jf-nav></jf-nav>
	</div>
</template>
<script>
	import Nav from "components/navigation.vue";
	export default({
		data(){
			return {
				
			}
		},
		mounted(){
			var t = $(".navigation").height();
			$(".main_content").height($(window).height()-t);
		},
		components:{
			"jf-nav":Nav
		}
	})
</script>
<style>
	.view{
		background-color: #f4f4f4;
	}
</style>