// element 按需引入
import {
	ElButton,
	ElInput,
	ElForm,
	ElFormItem,
	ElDropdown,
	ElDropdownMenu,
	ElDropdownItem,
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
