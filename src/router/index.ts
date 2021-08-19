/*
 * @Author: Rock Chang
 * @Date: 2021-08-05 11:34:59
 * @LastEditTime: 2021-08-19 18:42:17
 * @Description: 路由
 */
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes,
});

export default router;
