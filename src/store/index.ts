/*
 * @Author: Rock Chang
 * @Date: 2021-08-05 15:11:25
 * @LastEditTime: 2021-08-19 16:40:58
 * @Description:
 */
import { createStore, createLogger } from 'vuex';
import user from './modules/user';
import route from './modules/admin';

const debug = import.meta.env.MODE !== 'production';

const store = createStore({
	modules: {
		user,
		route,
	},
	strict: debug,
	plugins: debug ? [createLogger()] : [],
});

export default store;
