/*
 * @Author: Rock Chang
 * @Date: 2021-08-19 02:35:15
 * @LastEditTime: 2021-08-19 18:50:05
 * @Description: 管理员相关路由配置文件
 */

export const adminRouteConf = [
	{
		title: '数据分析',
		type: 'view', // 菜单类别 folder-文件夹 view-菜单项
		routeName: 'admin-portal',
		routePath: '/admin/portal',
		filePath: 'views/admin/portal/index.vue',
		admin: 1,
		icon: 'iconfont icon-tushuguanli',
	},
	{
		title: '用户管理',
		type: 'folder',
		routeName: 'admin-user',
		routePath: '/admin/user',
		filePath: 'views/admin/user/',
		admin: 1,
		icon: 'iconfont icon-tushuguanli',
		children: [
			{
				title: '用户列表',
				type: 'view',
				routeName: 'admin-user-list',
				routePath: '/admin/user/list',
				filePath: 'views/admin/user/list.vue',
				admin: 1,
				icon: 'iconfont icon-tushuguanli',
			},
			{
				title: '用户列表2',
				type: 'view',
				routeName: 'admin-user-list2',
				routePath: '/admin/user/list2',
				filePath: 'views/admin/user/list2.vue',
				admin: 1,
				icon: 'iconfont icon-tushuguanli',
			},
		],
	},
];
