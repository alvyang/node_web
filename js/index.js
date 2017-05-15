import Vue from "vue/dist/vue.js";
import router from "router/router.js";
import store from "store/store.js";
import moui from "mo-ui";
console.log(moui);
Vue.use(moui);

new Vue({
	el:"#app",
	template:"<keep-alive><router-view></router-view></keep-alive>",
	router,
	store,
});
