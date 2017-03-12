<template>
	<div class="search_div">
		<a class="logo"></a>
		<a class="input">
			<input type="text" />
		</a>
		<a class="search"></a>
	</div>
</template>
<script>
	
</script>
<style>
	.search_div{
		background: red;
		width: 10rem;
		height: 1.173rem;
		font-size: 0px;
		line-height: 1.173rem;
	}
	.search_div a{
		display: inline-block;
		vertical-align: middle;
	}
	.search_div .logo,.search_div .search{
		width: 1.173rem;
		height: 1.173rem;
	}
	.search_div .input{
		box-sizing: border-box;
		width:7.654rem;
		padding-left: 0.3rem;
		padding-right: 0.3rem;
		padding-top: 0.06rem;
	}
	.search_div .input input{
		width: 100%;
		border-radius: 50px;
		height: 0.773rem;
	}
</style>