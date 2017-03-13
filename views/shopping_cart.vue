<template>
	<div>
		<jf-no-content v-show="commodityList.length == 0" message="您的购物车是空的"></jf-no-content>
	</div>
</template>
<script>
	import NoContent from "components/no_content.vue";
	export default({
		data(){
			return {
				commodityList:[]
			}
		},
		components:{
			"jf-no-content":NoContent
		}
	})
</script>
<style>
	
</style>