/*
 * @Author: Rock Chang
 * @Date: 2021-08-08 15:00:23
 * @LastEditTime: 2021-12-31 16:33:21
 * @Description:
 */
// element 按需引入
import {
	// ElEmpty,
	// ElMenu,
	// ElSubmenu,
	// ElMenuItem,
	// ElUpload,
	// ElRadio,
	// ElRadioGroup,
	// ElTabs,
	// ElTabPane,
	// ElAvatar,
	// ElButton,
	// ElInput,
	// ElForm,
	// ElFormItem,
	// ElDropdown,
	// ElDropdownMenu,
	// ElDropdownItem,
	// ElDialog,
	ElLoading,
	ElMessage,
	// ElMessageBox,
} from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/el-message.css';
const components = [
	// ElEmpty,
	// ElMenu,
	// ElSubmenu,
	// ElMenuItem,
	// ElUpload,
	// ElRadio,
	// ElRadioGroup,
	// ElTabs,
	// ElTabPane,
	// ElAvatar,
	// ElButton,
	// ElInput,
	// ElForm,
	// ElFormItem,
	// ElDropdown,
	// ElDropdownMenu,
	// ElDropdownItem,
	// ElDialog,
	// ElLoading,
	// ElMessage,
	// ElMessageBox,
];
const plugins = [ElLoading];

export default {
	install(app: any) {
		// components.forEach(component => {
		// 	app.component(component.name, component);
		// });
		window.$message = ElMessage;
		plugins.forEach(plugin => {
			app.use(plugin);
		});
	},
};
