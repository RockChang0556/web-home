/*
 * @Author: Rock Chang
 * @Date: 2021-08-19 02:35:15
 * @LastEditTime: 2021-08-21 17:24:24
 * @Description: 管理员相关路由配置文件
 */

export const userRouteConf = [
	{
		title: '用户设置',
		type: 'view', // 菜单类别 folder-文件夹 view-菜单项
		routeName: 'user-settings',
		routePath: '/user/settings',
		filePath: 'views/user/settings/index.vue',
		admin: 0,
		icon: 'iconfont icon-tushuguanli',
	},
];
