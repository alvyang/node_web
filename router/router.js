import Vue from "vue/dist/vue.js";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//一级页面
import Main from "views/main.vue";
//异步按需加载
const Order= resolve => require.ensure([], () => resolve(require('views/order.vue')), 'group-order');

//二级页面
//首页五个页面
const Home= resolve => require.ensure([], () => resolve(require('views/home.vue')), 'group-main');
const Category= resolve => require.ensure([], () => resolve(require('views/category.vue')), 'group-main');
const ShoppingCart= resolve => require.ensure([], () => resolve(require('views/shopping_cart.vue')), 'group-main');
const PersonalCenter= resolve => require.ensure([], () => resolve(require('views/personal_center.vue')), 'group-main');
const Selected= resolve => require.ensure([], () => resolve(require('views/selected.vue')), 'group-main');
//添加地址页面
const Address= resolve => require.ensure([], () => resolve(require('views/address.vue')), 'group-address');
const AddressEdit= resolve => require.ensure([], () => resolve(require('views/address_edit.vue')), 'group-address');

const router = new VueRouter({
	routes:[{
		path:"/",
		component:Main,
		children:[{
			path:"",
			redirect: 'home' 
		},{
			path:"home",
			component:Home
		},{
			path:"selected",
			component:Selected
		},{
			path:"category",
			component:Category
		},{
			path:"shoppingcart",
			component:ShoppingCart
		},{
			path:"personalcenter",
			component:PersonalCenter
		}]
	},{
		path:"/order",
		component:Order,
	},{
		path:"/address",
		component:Address,
	},{
		path:"/address_edit",
		component:AddressEdit,
	}]
});

export default router;