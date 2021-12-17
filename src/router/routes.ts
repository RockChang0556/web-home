/*
 * @Author: Rock Chang
 * @Date: 2021-08-19 02:59:50
 * @LastEditTime: 2021-12-03 11:17:51
 * @Description: 整合所有路由
 */

import { RouteRecordRaw } from 'vue-router';
import { formatRoutes } from '@/utils/route';
import { adminRouteConf } from './route-admin';
import { userRouteConf } from './route-user';

const adminRoutes = formatRoutes(adminRouteConf);
const userRoutes = formatRoutes(userRouteConf);

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/home/home.vue'),
	},
	{
		path: '/admin',
		name: 'admin',
		component: () => import('@/views/admin/index.vue'),
		meta: {
			admin: 1,
		},
		children: [...adminRoutes],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录/注册',
		},
	},
	{
		path: '/user',
		name: 'user',
		component: () => import('@/views/user/index.vue'),
		meta: {
			admin: 0,
			title: '用户中心',
		},
		children: [...userRoutes],
	},
	{
		path: '/err',
		name: 'err',
		component: () => import('@/components/errpage/index.vue'),
		children: [
			{
				path: '403',
				name: '403',
				component: () => import('@/components/errpage/403.vue'),
			},
			{
				path: '404',
				name: '404',
				component: () => import('@/components/errpage/404.vue'),
			},
		],
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/err/404',
	},
];

export default routes;
