/*
 * @Author: Rock Chang
 * @Date: 2021-08-05 11:34:59
 * @LastEditTime: 2021-08-14 15:07:31
 * @Description: 路由
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/home/home.vue'),
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
const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes,
});

export default router;
