import Vue from "vue/dist/vue.js";
import router from "router/router.js";
import store from "store/store.js";

new Vue({
	el:"#app",
	template:"<keep-alive><router-view></router-view></keep-alive>",
	router,
	store,
});
