<template>
	<div class="shopping_cart_list">
		<jf-no-content v-show="commodityList.length == 0" message="您的购物车是空的"></jf-no-content>
		<div v-for="(c,index) in commodityList" class="cart_item">
			<div class="select_img" :id="'select'+index" @click="selectCommodity(index)"></div>
			<div class="commodity_message">
				<img :src="c.image"/>
				<div class="commodity_detail">{{c.full_name}}</div>
				<div class="commodity_operation">
					<a class="price"><span>¥</span>{{c.price}}</a>
					<div class="add_reduce">
						<a :class="['reduce',{'color_dddddd':c.quantity == 1}]" @click="reduceCommodity(index)">-</a><a class="num">{{c.quantity}}</a><a class="add" @click="addCommodity(index)">+</a>
					</div>
				</div>
			</div>
		</div>
		<div v-show="commodityList.length > 0"  :class="['shopping_cart_num',{'bottom_135':bottomFlag,'bottom_0':!bottomFlag}]">
			<div class="select_img_all" id="selectAll" @click="selectAll">全选</div>
			<div class="total">合计：¥ {{numPrice}}</div>
			<div class="settlement" @click="settlement">去结算</div>
		</div>
		<jf-prompt :message="message"></jf-prompt>
	</div>
</template>
<script>
	import NoContent from "components/no_content.vue";
	import Prompt from "components/prompt.vue";
	export default({
		data(){
			return {
				commodityList:[],
				numPrice:0.00,
				message:"",
				bottomFlag:true,
			}
		},
		mounted(){
			var _self = this;
			$.ajax({
				type: "post",
				url: "/inter/cart/getCartItem",
				data:{open_id:_self.$store.state.openid},
				success: function(res) {
					console.log(res);
					if(res.code == "000000"){
						_self.commodityList = res.data;
					}
				}
			});
			this.setCartNumdiv();
		},
		methods:{
			setCartNumdiv(){//用户设置shopping_cart_num  div显示位置
				var type = this.$route.params.type;
				if(type == 1){//
					this.bottomFlag = true;
				}else{
					this.bottomFlag = false;//
				}
			},
			selectCommodity(index){
				if($("#select"+index).attr("class") == "select_img"){
					$("#select"+index).removeClass("select_img").addClass("select_img_select");
				}else{
					$("#select"+index).removeClass("select_img_select").addClass("select_img");
				}
				var l = this.commodityList.length;
				var selectNum=0,noSelectNum=0,priceNumTemp=0;
				for(var i = 0 ; i < l ;i++){
					if($("#select"+i).attr("class") == "select_img"){
						noSelectNum++;//没有选中的个数
					}else{
						selectNum++;//选中的个数 
						priceNumTemp+= this.commodityList[i].quantity * this.commodityList[i].price;
					}
				}
				if(noSelectNum <= l && selectNum != l){
					$("#selectAll").removeClass("select_img_all_select").addClass("select_img_all");
				}else if(selectNum == l){
					$("#selectAll").removeClass("select_img_all").addClass("select_img_all_select");
				}
				this.numPrice =this.keepTwoDecimal(priceNumTemp);
			},
			keepTwoDecimal(num) {
				var result = parseFloat(num);
				if (isNaN(result)) {
					console.log('传递参数错误，请检查！');
					return false;
				}
			  	result = Math.round(num * 100) / 100;
			  	return result;
			},
			addCommodity(index){
				var temp = this.commodityList[index];
				temp.quantity++;
				if($("#select"+index).attr("class") == "select_img_select"){
					var t = this.numPrice + temp.price;
					this.numPrice = this.keepTwoDecimal(t);
				}
			},
			reduceCommodity(index){
				if(this.commodityList[index].quantity > 1){
					var temp = this.commodityList[index];
					temp.quantity--;
					if($("#select"+index).attr("class") == "select_img_select"){
						var t = this.numPrice - temp.price;
						this.numPrice = this.keepTwoDecimal(t);
					}
				}
			},
			selectAll(){
				var l = this.commodityList.length;
				var priceNumTemp = 0;
				if($("#selectAll").attr("class") == "select_img_all_select"){
					$("#selectAll").removeClass("select_img_all_select").addClass("select_img_all");
					for(var i = 0 ; i < l ;i++){
						$("#select"+i).removeClass("select_img_select").addClass("select_img");
					}
				}else{
					$("#selectAll").removeClass("select_img_all").addClass("select_img_all_select");
					for(var i = 0 ; i < l ;i++){
						$("#select"+i).removeClass("select_img").addClass("select_img_select");
						priceNumTemp+= this.commodityList[i].quantity * this.commodityList[i].price;
					}
				}
				
				this.numPrice =this.keepTwoDecimal(priceNumTemp);
			},
			settlement(){
				var _self = this;
				if(this.numPrice == 0){
					this.message = "请选择结算商品";
					return ;
				}
				
				this.$router.push({path:"/order"});
			}
		},
		components:{
			"jf-no-content":NoContent,
			"jf-prompt":Prompt,
		}
	})
</script>
<style>
	.shopping_cart_list{
		height: 100%;
		background-color: #f4f4f4;
	}
	.cart_item{
		box-sizing: border-box;
		background-color: #ffffff;
		padding-top: 0.3rem;
		padding-bottom: 0.3rem;
		font-size: 0;
		margin-bottom: 0.2rem;
	}
	.cart_item > div{
		display: inline-block;
	}
	.cart_item .select_img_select{
		background: url(../img/select.png) center center no-repeat;
		background-size: 0.6rem 0.6rem;
		width: 1.1rem;
		height: 2.5rem;
	}
	.cart_item .select_img{
		background: url(../img/no_select.png) center center no-repeat;
		background-size: 0.6rem 0.6rem;
		width: 1.1rem;
		height: 2.5rem;
	}
	.cart_item .commodity_message{
		position: relative;
		box-sizing: border-box;
		width: 8.9rem;
		padding-right: 0.2rem;
	}
	.commodity_message .commodity_detail{
		position: absolute;
		left: 2.8rem;
		top:0.2rem;
		padding-right: 0.5rem;
		box-sizing: border-box;
		font-size: 0.4rem;
		
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.commodity_message .commodity_operation{
		position: absolute;
		left: 2.8rem;
		bottom: 0.1rem;
		width: 5.6rem;
	}
	.commodity_operation .price{
		font-size: 0.4rem;
		color: #d81e06;
		line-height: 0.73rem;
	} 
	.commodity_operation .price span{
		font-size: 0.3rem;
		padding-right: 0.1rem;
	} 
	.commodity_operation .add_reduce{
		float: right;
	}
	.color_dddddd{
		color:#dddddd !important;
	}
	.add_reduce .num{
		display: inline-block;
		width: 1rem;
		height: 0.7rem;
		line-height: 0.7rem;
		vertical-align: middle;
		border-top: solid 1px #dddddd;
		border-bottom: solid 1px #dddddd;
		text-align: center;
		font-size: 0.35rem;
	}
	.add_reduce .add,.add_reduce .reduce{
		display: inline-block;
		width:0.7rem;
		height: 0.7rem;
		text-align: center;
		line-height: 0.7rem;
		font-size: 0.4rem;
		border: solid 1px #dddddd;
		vertical-align: middle;
	}
	.commodity_message img{
		float: left;
		width: 2.5rem;
		height: 2.5rem;
		border: solid 1px #dddddd;
	}
	.shopping_cart_num{
		background-color: #ffffff;
		position: fixed;
		height: 1.35rem;
		font-size: 0;
	    z-index: 2;
	}
	.bottom_135{
		bottom: 1.35rem;
	}
	.bottom_0{
		bottom: 0rem;
	}
	.select_img_all_select{
		background: url(../img/select.png) 0.4rem center no-repeat;
		background-size: 0.6rem 0.6rem;
		display: inline-block;
		width: 1.9rem;
		height: 1.35rem;
		line-height: 1.35rem;
		text-align: right;
		font-size: 0.4rem;
		color: #333333;
	}
	.select_img_all{
		background: url(../img/no_select.png) 0.4rem center no-repeat;
		background-size: 0.6rem 0.6rem;
		display: inline-block;
		width: 1.9rem;
		height: 1.35rem;
		line-height: 1.35rem;
		text-align: right;
		font-size: 0.4rem;
		color: #333333;
	}
	.total{
		display: inline-block;
		height: 1.1rem;
		line-height: 1.1rem;
		width: 5.6rem;
		font-size: 0.4rem;
		box-sizing: border-box;
		padding-left: 0.2rem;
	}
	.settlement{
		display: inline-block;
		background-color: #d81e06;
		width: 2.5rem;
		height: 1.35rem;
		font-size: 0.4rem;
		line-height: 1.35rem;
		color: #ffffff;
		text-align: center;
	}
</style>