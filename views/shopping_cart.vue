<template>
	<div class="shopping_cart_list">
		<jf-no-content v-show="commodityList.length == 0" message="您的购物车是空的"></jf-no-content>
		<div v-for="(c,index) in commodityList" class="cart_item">
			<div class="select_img" :id="'select'+index" @click="selectCommodity(index)"></div>
			<div class="commodity_message">
				<img :src="c.commodityUrl"/>
				<div class="commodity_detail">{{c.commodityName}}</div>
				<div class="commodity_operation">
					<a class="price"><span>¥</span>{{c.commodityPrice}}</a>
					<div class="add_reduce">
						<a :class="['reduce',{'color_dddddd':c.commodityNum == 1}]" @click="reduceCommodity(index)">-</a><a class="num">{{c.commodityNum}}</a><a class="add" @click="addCommodity(index)">+</a>
					</div>
				</div>
			</div>
		</div>
		<div class="shopping_cart_num">
			<div class="select_img_all" id="selectAll" @click="selectAll">全选</div>
			<div class="total">合计：¥ {{numPrice}}</div>
			<div class="settlement" @click="settlement">去结算</div>
		</div>
		<jf-prompt :message="message" v-show="message"></jf-prompt>
	</div>
</template>
<script>
	import NoContent from "components/no_content.vue";
	import Prompt from "components/prompt.vue";
	export default({
		data(){
			return {
				commodityList:[{
					commodityName:"山西特产宁化府益源庆名醋山西特产宁化府益源庆名醋2400ml（31.8元）",
					commodityPrice:52.48,
					commodityNum:1,
					commodityUrl:"img/logo.jpg",
					commodityDesc:"宁化府益源庆名醋纯粮酿造，甜、绵、酸、香浓、高质量，誉满全国，经久不衰。",
				},{
					commodityName:"山西特产宁化府益源庆名醋山西特产宁化府益源庆名醋2400ml（31.8元）",
					commodityPrice:31.25,
					commodityNum:1,
					commodityUrl:"img/logo.jpg",
					commodityDesc:"宁化府益源庆名醋纯粮酿造，甜、绵、酸、香浓、高质量，誉满全国，经久不衰。",
				}],
				numPrice:0.00,
				message:"",
			}
		},
		methods:{
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
						priceNumTemp+= this.commodityList[i].commodityNum * this.commodityList[i].commodityPrice;
					}
				}
				if(noSelectNum == l){
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
				temp.commodityNum++;
				if($("#select"+index).attr("class") == "select_img_select"){
					var t = this.numPrice + temp.commodityPrice;
					this.numPrice = this.keepTwoDecimal(t);
				}
			},
			reduceCommodity(index){
				if(this.commodityList[index].commodityNum > 1){
					var temp = this.commodityList[index];
					temp.commodityNum--;
					if($("#select"+index).attr("class") == "select_img_select"){
						var t = this.numPrice - temp.commodityPrice;
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
						priceNumTemp+= this.commodityList[i].commodityNum * this.commodityList[i].commodityPrice;
					}
				}
				
				this.numPrice =this.keepTwoDecimal(priceNumTemp);
			},
			settlement(){
				var _self = this;
				if(this.numPrice == 0){
					this.message = "请选择结算商品";
					setTimeout(function(){
						_self.message = "";
					},2000);
				}
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
		left: 3rem;
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
		left: 3rem;
		bottom: 0rem;
		width: 5.6rem;
	}
	.commodity_operation .price{
		font-size: 0.4rem;
		color: #d81e06;
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
		bottom: 1.35rem;
		height: 1.1rem;
		font-size: 0;
	}
	.select_img_all_select{
		background: url(../img/select.png) 0.4rem center no-repeat;
		background-size: 0.5rem 0.5rem;
		display: inline-block;
		width: 1.7rem;
		height: 1.1rem;
		line-height: 1.1rem;
		text-align: right;
		font-size: 0.35rem;
		color: #333333;
	}
	.select_img_all{
		background: url(../img/no_select.png) 0.4rem center no-repeat;
		background-size: 0.5rem 0.5rem;
		display: inline-block;
		width: 1.7rem;
		height: 1.1rem;
		line-height: 1.1rem;
		text-align: right;
		font-size: 0.35rem;
		color: #333333;
	}
	.total{
		display: inline-block;
		height: 1.1rem;
		line-height: 1.1rem;
		width: 5.8rem;
		font-size: 0.35rem;
		box-sizing: border-box;
		padding-left: 0.2rem;
	}
	.settlement{
		display: inline-block;
		background-color: #d81e06;
		width: 2.5rem;
		height: 1.1rem;
		font-size: 0.35rem;
		line-height: 1.1rem;
		color: #ffffff;
		text-align: center;
	}
</style>