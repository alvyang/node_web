<template>
	<div class="shopping_cart_list">
		<jf-no-content v-show="commodityList.length == 0" message="您的购物车是空的"></jf-no-content>
		<div v-for="(c,index) in commodityList" class="cart_item_div">
			<slider_delete :sliderConf="sliderConf" ref="slider">
				<div class="cart_item">
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
			</slider_delete>
			<div class="delete_button" @click="deleteCartItem(index)"></div>
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
	import SliderDelete from "components/slider_delete.vue";
	export default({
		data(){
			return {
				sliderConf:{//滑动配置
					direction:'direction',
					distance:1.4,
				},
				commodityList:[],
				numPrice:0.00,
				message:"",
				bottomFlag:true,
				orderCommoditys:[],
			}
		},
		mounted(){
			this.getCartItem();
		},
		activated(){
			this.getCartItem();
		},
		methods:{
			getCartItem(){//获取购物车信息
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
			deleteCartItem(index){//删除购物车信息
				var _self = this;
				$.ajax({//删除购物车接口
					type: "post",
					url: "/inter/cart/deleteCartItem",
					data:{id:_self.commodityList[index].item_id},
					success: function(res) {
						console.log(res);
						if(res.code == "000000"){
							if($("#select"+index).attr("class") == "select_img_select"){//如果为选中状态
								var num = _self.commodityList[index].quantity * _self.commodityList[index].price;
								_self.numPrice = _self.numPrice - _self.keepTwoDecimal(num);
							}
							_self.$refs.slider[index].currentX = 0 ;
							_self.commodityList.splice(index,1);
						}
					}
				});
			},
			setCartNumdiv(){//用户设置shopping_cart_num  div显示位置
				var type = this.$route.params.type;
				if(type == 1){//
					this.bottomFlag = true;
				}else{
					this.bottomFlag = false;//
				}
			},
			selectCommodity(index){//
				if($("#select"+index).attr("class") == "select_img"){//未选中
					this.orderCommoditys[index]=null;
					$("#select"+index).removeClass("select_img").addClass("select_img_select");
				}else{//选中
					this.orderCommoditys[index]=this.commodityList[index];
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
			keepTwoDecimal(num) {//保留两们小数
				var result = parseFloat(num);
				if (isNaN(result)) {
					console.log('传递参数错误，请检查！');
					return false;
				}
			  	result = Math.round(num * 100) / 100;
			  	return result;
			},
			updateQuantity(id,quantity){//更新购买数量
				$.ajax({
					type: "post",
					url: "/inter/cart/updateQuantity",
					data:{id:id,quantity:quantity},
					success: function(res) {
						console.log(res);
					}
				});
			},
			addCommodity(index){//添加商品
				var temp = this.commodityList[index];
				temp.quantity++;
				this.updateQuantity(temp.item_id,temp.quantity);
				if($("#select"+index).attr("class") == "select_img_select"){
					var t = this.numPrice + temp.price;
					this.numPrice = this.keepTwoDecimal(t);
				}
			},
			reduceCommodity(index){//减商品
				if(this.commodityList[index].quantity > 1){
					var temp = this.commodityList[index];
					temp.quantity--;
					this.updateQuantity(temp.item_id,temp.quantity);
					if($("#select"+index).attr("class") == "select_img_select"){
						var t = this.numPrice - temp.price;
						this.numPrice = this.keepTwoDecimal(t);
					}
				}
			},
			selectAll(){//选择所有的商品
				var l = this.commodityList.length;
				var priceNumTemp = 0;
				if($("#selectAll").attr("class") == "select_img_all_select"){//取消选中
					this.orderCommoditys=[];
					$("#selectAll").removeClass("select_img_all_select").addClass("select_img_all");
					for(var i = 0 ; i < l ;i++){
						$("#select"+i).removeClass("select_img_select").addClass("select_img");
					}
				}else{//选中
					this.orderCommoditys=this.commodityList;
					$("#selectAll").removeClass("select_img_all").addClass("select_img_all_select");
					for(var i = 0 ; i < l ;i++){
						$("#select"+i).removeClass("select_img").addClass("select_img_select");
						priceNumTemp+= this.commodityList[i].quantity * this.commodityList[i].price;
					}
				}
				
				this.numPrice =this.keepTwoDecimal(priceNumTemp);
			},
			settlement(){//结算
				var _self = this;
				if(this.numPrice == 0){
					this.message = "请选择结算商品";
					return ;
				}
				var ol = this.orderCommoditys.length;
				var selectCommodity=[];
				for(var i = 0 ; i < ol ; i++){
					if(this.orderCommoditys[i]){
						selectCommodity.push(this.orderCommoditys[i]);
					}
				}
				sessionStorage["selectCommodity"]=JSON.stringify(selectCommodity);
				this.$router.push({path:"/order"});
			}
		},
		components:{
			"jf-no-content":NoContent,
			"jf-prompt":Prompt,
			"slider_delete":SliderDelete,
		}
	})
</script>
<style>
	.cart_item_div{
		position: relative;
		height: 3.2rem;
		left: 0;
		overflow: hidden;
		margin-bottom: 0.2rem;
	}
	.delete_button{
		position: absolute;
		background: url(../img/delete.png) center center no-repeat;
		background-size: 0.6rem auto;
		right: 0px;
		height: 3.2rem;
		width: 1.4rem;
		background-color: #d81e06;
		z-index: 99;
	}
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
		width: 10rem;
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
		height: 2.6rem;
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
		position: absolute;
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