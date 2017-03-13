import Vue from "vue/dist/vue.js";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//一级页面
import Main from "views/main.vue";
//二级页面
import Home from "views/home.vue";
import Category from "views/category.vue";
import ShoppingCart from "views/shopping_cart.vue";
import PersonalCenter from "views/personal_center.vue";
import Selected from "views/selected.vue";
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
	}]
});

export default router;