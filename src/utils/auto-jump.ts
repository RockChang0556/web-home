/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 19:37:51
 * @LastEditTime: 2021-08-15 10:45:52
 * @Description: 定时自动登出功能, 启用后一段时间无用户操作, 则自动登出. 需在项目 config 中配置
 */
import store from '@/store';
import Config from '@/config';

export default (router: any) => {
	let timer;

	if (timer) clearTimeout(timer);
	if (!Config.openAutoJumpOut) return;
	// if (
	// 	router?.currentRoute.value.path === '/' ||
	// 	router?.currentRoute.value.path === '/login'
	// ) {
	// 	return;
	// }

	timer = setTimeout(() => {
		store.dispatch('user/logout');
		const { origin } = window.location;
		window.location.href = origin;
	}, Config.stagnateTime);
};
