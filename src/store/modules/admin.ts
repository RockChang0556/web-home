/*
 * @Author: Rock Chang
 * @Date: 2021-08-05 15:11:25
 * @LastEditTime: 2021-08-21 18:11:48
 * @Description:
 */
import { adminRouteConf } from '@/router/route-admin';
import userStore, { UserProps } from './user';
import config from '@/config/index';

// initial state
const state = {};

// getters
const getters = {
	permissionStageConfig() {
		const userInfo = JSON.parse(
			(sessionStorage.getItem('userInfo') as string) || '{}'
		);
		// 筛选掉权限不够的配置
		const shookConfig = permissionShaking(adminRouteConf, userInfo);
		// 拉平配置
		// const list: any = {};
		// deepTravel(shookConfig, (item: any) => {
		// 	list[item.routeName] = item;
		// });
		return shookConfig;
	},
	sideList(state: any, getters: any) {
		const { permissionStageConfig } = getters;
		const sideBar = deepGetSidebar(permissionStageConfig, config.sidebarLevel);
		return sideBar;
	},
};

// actions
const actions = {};

// mutations
const mutations = {};

// 将路由配置按展开级别处理成菜单需要的格式
function deepGetSidebar(target: any, level = 3) {
	// 集合节点处理
	if (Array.isArray(target)) {
		const acc: any = target.map(item => deepGetSidebar(item, level - 1));
		return acc.filter((item: any) => item !== null);
	}

	// 处理 folder 模式
	if (target.type === 'folder' && level !== 0) {
		return {
			name: target.routeName,
			title: target.title,
			icon: target.icon,
			path: target.routePath,
			children: target.children
				.map((item: any) => deepGetSidebar(item, level - 1))
				.filter((item: any) => item !== null),
		};
	}

	// 处理一级就是 view 的情况
	if (target.type === 'view') {
		return {
			name: target.routeName,
			title: target.title,
			icon: target.icon,
			path: target.routePath,
		};
	}

	// 最后一层, 都当做子节点处理
	if (level <= 0) {
		const sideConfig: any = {};
		sideConfig.name = target.routeName;
		sideConfig.title = target.title;
		sideConfig.icon = target.icon;
		sideConfig.path = target.routePath;
		if (
			target.children &&
			target.children.length > 0 &&
			target.children[0].routePath
		) {
			sideConfig.path = target.children[0].routePath;
		}
		return sideConfig;
	}
	return null;
}
/**
 * 递归
 * @param {*} obj
 * @param {*} fuc
 */
function deepTravel(obj: any, fuc: any) {
	if (Array.isArray(obj)) {
		obj.forEach(item => {
			deepTravel(item, fuc);
		});
		return;
	}
	if (obj && obj.children) {
		fuc(obj);
		deepTravel(obj.children, fuc);
		return;
	}
	if (obj.routeName) {
		fuc(obj);
	}
}
/**
 * 在侧边栏展示时，如果当前路由 children 属性为空，则删除该路由
 * @param {*} arr 路由配置项数据
 */
function IterationDelateMenuChildren(arr: any[]) {
	if (arr.length) {
		for (const i in arr) {
			if (arr[i].children && !arr[i].children.length) {
				delete arr[i];
			} else if (arr[i].children && arr[i].children.length) {
				IterationDelateMenuChildren(arr[i].children);
			}
		}
	}
	return arr;
}

/**
 * Shaking 掉无权限路由
 * @param {array} stageConfig 路由配置项数据
 * @param {object} currentUser 当前登录管理员
 */
function permissionShaking(stageConfig: any, currentUser: UserProps) {
	const shookConfig = stageConfig.filter((route: any) => {
		if (Number(currentUser.admin ?? 0) >= Number(route.admin)) {
			if (route.children && route.children.length) {
				route.children = permissionShaking(route.children, currentUser);
			}
			return true;
		}
		return false;
	});
	return IterationDelateMenuChildren(shookConfig);
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
