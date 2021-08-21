/*
 * @Author: Rock Chang
 * @Date: 2021-08-19 02:59:50
 * @LastEditTime: 2021-08-21 17:57:48
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
	},
	{
		path: '/user',
		name: 'user',
		component: () => import('@/views/user/index.vue'),
		meta: {
			admin: 0,
		},
		children: [...userRoutes],
	},
];

export default routes;
