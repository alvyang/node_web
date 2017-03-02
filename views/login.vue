<template>
	<div class="login_page">
		<div class="login">
			<input type="text" v-model="ruleForm2.username" placeholder="请输入用户名"/>
			<input type="password" v-model="ruleForm2.password" placeholder="请输入密码"/>
			<button @click="submitForm('ruleForm2')">提交</button>
		</div>
	</div>
</template>
<script>
	export default({
		data() {
			return {
				ruleForm2: {
					username: '',
					password: '',
				}
			};
		},
		mounted(){
			$(".login_page").height($(window).height());
			$(window).resize(function(){
				$(".login_page").height($(window).height());
			});
		},
		methods: {
			submitForm(formName) {
				var _self = this;
				$.ajax({
					type:"post",
					url:"/inter/login/login",
					data:_self.ruleForm2,
					success:function(res){
						if(res.code == "000000"){
							_self.$router.push({path:"/main"});
						}else{
							console.log(res.message);
						}
				    }
				});
			}
		}
	})
</script>
<style>
	.login{
		position: absolute;
		width: 300px;
		height: 240px;
		left: 50%;
		top: 50%;
		margin-left: -150px;
		margin-top: -120px;
	}
</style>