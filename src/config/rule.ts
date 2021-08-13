/*
 * @Author: Rock Chang
 * @Date: 2021-08-13 13:01:36
 * @LastEditTime: 2021-08-13 13:23:34
 * @Description: 通用校验规则
 */

export const passwordRule = [
	{ required: true, message: '请输入密码', trigger: 'blur' },
	{
		pattern: /^[\w#@!~%^&*]{6,18}$/,
		message: '密码长度在6~18之间，支持字母、数字,特殊字符',
		trigger: 'blur',
	},
];

export const emailRule = [
	{ required: true, message: '请输入邮箱', trigger: 'blur' },
	{ min: 6, max: 30, message: '邮箱长度在6~30之间', trigger: 'blur' },
	{
		pattern: /(^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$)/,
		message: '邮箱格式不正确',
		trigger: 'blur',
	},
];
export const phoneRule = [
	{ required: true, message: '请输入手机号', trigger: 'blur' },
	{
		pattern: /(^1[3|4|5|7|8]\d{9}$)/,
		message: '手机号格式不正确',
		trigger: 'blur',
	},
];
export const codeRule = [
	{ required: true, message: '请输入验证码', trigger: 'blur' },
	{
		pattern: /^[0-9]{4}$/,
		message: '验证码为4位数字',
		trigger: 'blur',
	},
];
export const nicknameRule = [
	{ required: true, message: '请输入昵称', trigger: 'blur' },
	{
		pattern: /^([a-zA-Z0-9_\u4e00-\u9fa5]{2,10})$/,
		message: '昵称长度在2~10之间, 支持数字,字母,汉字,下划线',
		trigger: 'blur',
	},
];
