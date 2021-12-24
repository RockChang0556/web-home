/*
 * @Author: Rock Chang
 * @Date: 2021-08-10 11:56:04
 * @LastEditTime: 2021-12-22 15:58:55
 * @Description: 接口修改类型定义
 */
export interface LoginProps {
	account: string;
	password: string;
	sid?: string;
	captcha?: string;
	register?: boolean; // 是否是注册自动登录的
}
export interface RegisterProps {
	name: string;
	email: string;
	password: string;
	code: string;
}
