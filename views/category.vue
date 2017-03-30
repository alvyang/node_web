<template>
	<div class="category_div">
		<div class="category_list">
			<i-scroll>
				<a v-for="c in category" class="category_item">{{c.name}}</a>
			</i-scroll>
		</div>
	</div>
</template>
<script>
	import scroll from "components/scroll.vue";
	export default({
		data(){
			return{
				category:[{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				}]
			}
		},
		mounted(){
			$(".category_div").height($(window).height());
		},
		components:{
			"i-scroll":scroll,
		}
	})
</script>
<style>
	.category_list{
		float: left;
		width: 3rem;
		height: 100%;
		border-right: solid 1px blue;
	}
	.category_item{
		display: block;
		background-color: red;
		height: 1.5rem;
		width: 100%;
		line-height: 1.5rem;
		text-align: center;
	}
	.category_div{
		box-sizing: border-box;
		width: 10rem;
	}
</style>