/*
 * @Author: Rock Chang
 * @Date: 2021-08-05 15:11:25
 * @LastEditTime: 2021-12-02 17:30:37
 * @Description:
 */
import { UserApi } from '@/services';
import { removeToken } from '@/utils/token';

export interface UserProps {
	id?: number;
	name?: string;
	phone?: string;
	admin?: '0' | '1' | '2' | '3' | '4' | '5';
	email?: string;
	avatar_url?: string;
	position?: string;
	sex?: 1 | 0 | -1;
	summary?: string;
	isFetched: boolean;
}
interface StateProps {
	lang: string;
	userInfo: UserProps;
}
// initial state
const state: StateProps = {
	lang: 'zh',
	userInfo: {
		isFetched: false,
	},
};

// getters
const getters = {};

// actions
const actions = {
	logout({ commit }: any) {
		commit('setUserInfo', { isFetched: true });
		removeToken();
	},
	async getUserInfo({ commit }: any) {
		const userInfo = await UserApi.getCurrentUser();
		if (userInfo && userInfo.code === 0 && userInfo.data.id) {
			commit('setUserInfo', { ...userInfo.data, isFetched: true });
		}
	},
};

// mutations
const mutations = {
	setUserInfo(state: StateProps, userInfo: UserProps) {
		state.userInfo = userInfo;
		sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
	},
	setLang(state: StateProps, lang: string) {
		state.lang = lang;
		sessionStorage.setItem('lang', lang);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
