/*
 * @Author: Rock Chang
 * @Date: 2021-08-08 15:00:23
 * @LastEditTime: 2021-08-12 20:50:29
 * @Description:
 */
// element 按需引入
import {
	ElButton,
	ElInput,
	ElForm,
	ElFormItem,
	ElDropdown,
	ElDropdownMenu,
	ElDropdownItem,
	ElDialog,
	ElLoading,
	ElMessage,
	ElMessageBox,
} from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
const components = [
	ElButton,
	ElInput,
	ElForm,
	ElFormItem,
	ElDropdown,
	ElDropdownMenu,
	ElDropdownItem,
	ElDialog,
];
const plugins = [ElLoading, ElMessage, ElMessageBox];

export default {
	install(app: any) {
		components.forEach(component => {
			app.component(component.name, component);
		});

		plugins.forEach(plugin => {
			app.use(plugin);
		});
	},
};
