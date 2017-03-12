<template>
	<div>
		<jf-top></jf-top>
		<keep-alive><router-view></router-view></keep-alive>
		<jf-nav></jf-nav>
	</div>
</template>
<script>
	import Top from "components/top.vue";
	import Nav from "components/navigation.vue";
	export default({
		data(){
			return {
				
			}
		},
		components:{
			"jf-top":Top	,
			"jf-nav":Nav
		}
	})
</script>
<style>
	
</style>