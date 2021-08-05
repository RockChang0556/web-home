import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/home/home.vue'),
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes,
});

export default router;
