<template>
	<div>
		<div class="main_content">
			<keep-alive>
				<router-view class="view"></router-view>
			</keep-alive>
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
			if(!this.$store.state.openid){
				var _self = this;
				var args = {};
				var search = decodeURIComponent(location.search.substring(1));
			    var reg = /(?:([^&]+)=([^&]+))/g;
			    var match = search.match(reg);
			    if(match){
				   	for(var i = 0 ; i < match.length;i++){
						var temp = match[i].split("=");   		
				    		args[temp[0]]  = temp[1];
				   	}
			    }
			    $.ajax({
					type: "post",
					url: "/inter/wechat/getOpenId",
					async:false,
					data:{code:args.code},
					success: function(res) {
						if(res.code == "000000"){
							_self.$store.state.openid = res.openid
						}
					}
				});
			}
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