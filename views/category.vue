<template>
	<div class="category_div">
		<div class="category_list">
			<i-scroll id="category_list">
				<a v-for="c in category" class="category_item">{{c.name}}</a>
			</i-scroll>
		</div>
		<div class="product_list">
			<i-scroll id="product_list">
				<a v-for="p in product" class="product_item">{{p.name}}</a>
			</i-scroll>
		</div>
	</div>
</template>
<script>
	import scroll from "components/scroll.vue";
	export default({
		data(){
			return{
				product:[{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"001"
				},{
					name:"0031"
				},{
					name:"0021"
				},{
					name:"0011"
				},{
					name:"0000001"
				}],
				category:[{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test01",
				},{
					name:"test71",
				},{
					name:"test61",
				},{
					name:"test51",
				},{
					name:"test01",
				},{
					name:"test41",
				},{
					name:"test31",
				},{
					name:"test21",
				},{
					name:"test11",
				},{
					name:"test09",
				},{
					name:"test08",
				},{
					name:"test07",
				},{
					name:"test06",
				},{
					name:"test05",
				},{
					name:"test04",
				},{
					name:"test03",
				},{
					name:"test02",
				},{
					name:"test00001",
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
	.product_list{
		position: absolute;
		left: 3rem;
		top: 0;
		width: 7rem;
		height: 100%;
		box-sizing: border-box;
		padding-bottom: 1.35rem;
	}
	.product_item{
		display: block;
		background-color: yellow;
		height: 1.5rem;
		width: 100%;
		line-height: 1.5rem;
		text-align: center;
	}
	.category_list{
		position: absolute;
		left: 0;
		width: 3rem;
		height: 100%;
		border-right: solid 1px blue;
		box-sizing: border-box;
		padding-bottom: 1.35rem;
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
		position: relative;
		box-sizing: border-box;
		width: 10rem;
	}
</style>