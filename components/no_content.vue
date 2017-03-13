<template>
	<div class="no_content">
		<img src="../img/no_content.png" />
		<div>{{message}}</div>
	</div>
</template>
<script>
	export default({
		data(){
			return{}
		},
		props:["message"]
	})
</script>
<style>
	.no_content{
		width: 10rem;
		height: 100%;
		text-align: center;
	}
	.no_content div{
		margin-top: 0.3rem;
		color: #d8d8d8;
	}
	.no_content img{
		width: 3rem;
		margin-top: 4rem;
	}
</style>