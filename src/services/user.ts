/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 23:06:34
 * @LastEditTime: 2021-08-12 21:51:05
 * @Description:
 */
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
		const { data } = await get('/user/current');
		const storeUser = store.getters.user === null ? {} : store.getters.user;
		return Object.assign({ ...storeUser }, data);
	}

	/** 发送验证码到邮箱
	 * @param {object} params
	 * 	email 收件人邮箱
	 * 	reason 邮件目的 注册/修改密码/其他验证
	 * @return {*}
	 */
	static async getEmailCode(params: { email: string; reason: string }) {
		return post('/user/email/code', params);
	}

	/** 通过邮箱修改密码
	 * @param {*} params
	 * @return {*}
	 */
	static async updatePassword(params: {
		email: string;
		code: string;
		password: string;
	}) {
		return post('/user/update_password', params);
	}
}
