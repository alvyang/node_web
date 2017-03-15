<template>
	<div class="category_div">
		<div>
			<div class="category_title">手机数码</div>
			<div class="category_content">
				<table>
					<tr>
						<td><a>全部</a></td>
						<td><a>手机通讯</a></td>
						<td><a>手机配件</a></td>
						<td><a>电子教育</a></td>
					</tr>
					<tr>
						<td><a>智能设备</a></td>
						<td><a>时尚影音</a></td>
						<td><a>时尚影音</a></td>
						<td><a>时尚影音</a></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	export default({
		data(){
			return{}
		},
		mounted(){
			$(".category_div").height($(window).height());
		}
	})
</script>
<style>
	.category_content{
		background-color: #ffffff;
	}
	.category_content table{
		text-align: center;
		border-collapse: collapse;
		width: 100%;
	}
	.category_content table td{
		width: 20%;
		height: 1rem;
		border: solid 1px #dddddd;
	}
	.category_title{
		box-sizing: border-box;
		padding-left: 0.35rem;
		color: #2b9bd3;
		font-size: 0.4rem;
		height: 1.2rem;
		line-height: 1.2rem;
	}
</style>