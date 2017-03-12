<template>
	<div class="navigation">
		<router-link to="home" active-class="nav_current_1">首页</router-link>
		<router-link to="category"  active-class="nav_current_2">分类</router-link>
		<router-link to="selected" active-class="nav_current_3">精选</router-link>
		<router-link to="shoppingcard" active-class="nav_current_4">购物车</router-link>
		<router-link to="personalcenter" active-class="nav_current_5">个人中心</router-link>
	</div>
</template>
<script>
	
</script>
<style>
	.navigation a:nth-child(1){
		background: url(../img/nav/home.png) center 0.25rem no-repeat;
		background-size: 0.5rem auto;
	}
	.nav_current_1{
		background: url(../img/nav/home_on.png) center 0.25rem no-repeat !important;
		background-size: 0.5rem auto !important;
		color: #d81e06 !important;
	}
	.navigation a:nth-child(2){
		background: url(../img/nav/category.png) center 0.25rem no-repeat;
		background-size: 0.5rem auto;
	}
	.nav_current_2{
		background: url(../img/nav/category_on.png) center 0.25rem no-repeat !important;
		background-size: 0.5rem auto !important;
		color: #d81e06 !important;
	}
	.navigation a:nth-child(3){
		background: url(../img/nav/selected.png) center 0.25rem no-repeat;
		background-size: 0.5rem auto;
	}
	.nav_current_3{
		background: url(../img/nav/selected_on.png) center 0.25rem no-repeat !important;
		background-size: 0.5rem auto !important;
		color: #d81e06 !important;
	}
	.navigation a:nth-child(4){
		background: url(../img/nav/shopping_card.png) center 0.25rem no-repeat;
		background-size: 0.5rem auto;
	}
	.nav_current_4{
		background: url(../img/nav/shopping_card_on.png) center 0.25rem no-repeat !important;
		background-size: 0.5rem auto !important;
		color: #d81e06 !important;
	}
	.navigation a:nth-child(5){
		background: url(../img/nav/personal_center.png) center 0.25rem no-repeat;
		background-size: 0.5rem auto;
	}
	.nav_current_5{
		background: url(../img/nav/personal_center_on.png) center 0.25rem no-repeat !important;
		background-size: 0.5rem auto !important;
		color: #d81e06 !important;
	}
	.navigation a{
		display: inline-block;
		position: relative;
		width: 20%;
		font-size: 0.3rem;
		color: #8a8a8a;
		text-align: center;
		text-decoration: none;
	}
	.navigation{
		border-top: solid 1px #dddddd;
		background-color: #eeeeee;
		position: fixed;
		bottom: 0rem;
		width:10rem;
		height: 1.35rem;
		line-height: 2.1rem;
		font-size: 0;
	}
</style>