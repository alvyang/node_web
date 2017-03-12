<template>
	<div class="mask" @click="maskNone" ></div>
</template>
<script>
	export default({
		data(){
			return{}
		},
		props:["mask"],
		methods:{
			maskNone(){
				this.mask.mask = false;
			}
		},
		mounted(){
			$(".mask").height($(window).height());
		}
	})
</script>
<style>
	.mask{
	    position: fixed;
	    top: 0px;
	    left: 0px;
	    right: 0px;
	    z-index: 100;
	    opacity: 1;
	    background-color: rgba(0, 0, 0, 0.7);
	}
</style>