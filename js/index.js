import Vue from "vue/dist/vue.js";
import router from "router/router.js";
import store from "store/store.js";
import moui from "mo-ui/lib/index.js";
Vue.use(moui,"123");

new Vue({
	el:"#app",
	template:"<keep-alive><router-view></router-view></keep-alive>",
	router,
	store,
});
