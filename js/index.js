import Vue from "vue/dist/vue.js";
import router from "router/router.js";
import store from "store/store.js";

new Vue({
	el:"#app",
	template:"<router-view></router-view>",
	router,
	store,
});
