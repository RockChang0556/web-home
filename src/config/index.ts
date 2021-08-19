/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 19:25:59
 * @LastEditTime: 2021-08-19 18:46:21
 * @Description:
 */
const config = {
	sidebarLevel: 3, // 侧边栏层级（无限级）限制, 默认为 3 级，可根据需求自行扩充
	openAutoJumpOut: true, // 是否开启无操作跳出
	defaultRoute: '/about', // 默认打开的路由
	websocketEnable: false, // 默认关闭 websocket
	showSidebarSearch: true, // 默认打开侧边栏搜索
	notLoginRoute: ['login'], // 无需登录即可访问的路由 name,
	useFrontEndErrorMsg: false, // 默认采用后端返回异常
	stagnateTime: 60 * 60 * 1000, // 无操作停滞时间，默认1小时
	baseURL: import.meta.env.VITE_BASE_API, // API接口baseURL，在根目录.env文件查找对应环境变量配置
};
export default config;

export const constant = {
	loginUrl: `/login?redirect_uri=${location.href}`, // 登陆url,登陆后重定向到原始页面
};
