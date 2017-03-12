import Vue from "vue/dist/vue.js";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Main from "views/main.vue";

const router = new VueRouter({
	routes:[{
		path:"/",component:Main
	}]
});

export default router;