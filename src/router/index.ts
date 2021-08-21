/*
 * @Author: Rock Chang
 * @Date: 2021-08-05 11:34:59
 * @LastEditTime: 2021-08-21 18:31:57
 * @Description: 路由
 */
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { ElMessage } from 'element-plus';

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const hasToken = localStorage.getItem('access_token');
	// 登录验证
	if (isLoginRequired(to.meta) && !hasToken) {
		next({ name: 'login' });
		return;
	}
	// 权限验证
	const userInfo = JSON.parse(
		(sessionStorage.getItem('userInfo') as string) || '{}'
	);
	const userAdmin: number = userInfo.admin ?? -1;
	const pageAdmin: number = (to.meta.admin as number) ?? -1;
	if (pageAdmin > userAdmin) {
		ElMessage.error('您无此页面的权限哟');
		next({ name: '403' });
		return;
	}

	// 路由发生变化重新计时
	// autoJump(router);

	// 路由发生变化修改页面title
	if (to.meta.title) {
		document.title = `${to.meta.title} | 鹏`;
	}

	next();
});

function isLoginRequired(meta: any) {
	return meta.admin >= 0;
}

export default router;
