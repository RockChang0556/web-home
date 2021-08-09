import { createStore, createLogger } from 'vuex';
import user from './modules/user';

const debug = import.meta.env.MODE !== 'production';

const store = createStore({
	modules: {
		user,
	},
	strict: debug,
	plugins: debug ? [createLogger()] : [],
});

export default store;
