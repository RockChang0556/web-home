/*
 * @Author: Rock Chang
 * @Date: 2021-08-19 02:59:50
 * @LastEditTime: 2021-08-19 18:50:19
 * @Description: 整合所有路由
 */

import { RouteRecordRaw } from 'vue-router';
import { formatRoutes } from '@/utils/route';
import { adminRouteConf } from './admin';

const adminRoutes = formatRoutes(adminRouteConf);

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
		children: [...adminRoutes],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/user/settings',
		name: 'user-settings',
		component: () => import('@/views/user/settings/index.vue'),
	},
];

console.log('', routes);
export default routes;
