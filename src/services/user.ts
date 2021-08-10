// @ts-ignore
import _axios, { post, get, put } from '@/utils/axios';
import store from '@/store';
import { saveTokens } from '@/utils/token';
import { RegisterProps } from '@/types/service';

export default class User {
	/**
	 * 分配用户2
	 * @param {object} user 注册信息
	 */
	static register2(user: any) {
		return _axios({
			method: 'post',
			url: 'cms/user/register',
			data: {
				email: user.email,
				username: user.username,
				password: user.password,
				group_ids: user.groupIds,
				confirm_password: user.confirmPassword,
			},
			handleError: true,
		} as any);
	}

	/**
	 * @description: 登陆 - 获取tokens
	 * @param {object} params
	 */
	static async login(params: { account: string; password: string }) {
		const { data } = await post('/user/login', params);
		const { data: tokens } = data;
		saveTokens(tokens.access_token, tokens.refresh_token);
		return data;
	}
	/**
	 * @description: 注册
	 * @param {object} params
	 */
	static async register(params: RegisterProps) {
		const { data } = await post('/user/register', params);
		return data;
	}

	/**
	 * 获取当前用户信息，并返回User实例
	 */
	static async getCurrentUser() {
		const { data } = await get('/user/getCurrentUser');
		const storeUser = store.getters.user === null ? {} : store.getters.user;
		return Object.assign({ ...storeUser }, data);
	}

	/**
	 * 用户修改密码
	 * @param {string} newPassword 新密码
	 * @param {string} confirmPassword 确认新密码
	 * @param {string} oldPassword 旧密码
	 */
	// eslint-disable-next-line camelcase
	static updatePassword(params: {
		old_password: string;
		new_password: string;
		confirm_password: string;
	}) {
		return put('cms/user/change_password', params);
	}
}
