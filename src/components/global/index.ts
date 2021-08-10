// src/components/global 目录下的所有组件将会被全局注册

// 获取此文件同级的所有index.vue
const componentsContext = import.meta.globEager('./**/index.vue');

export default {
	install(app: any) {
		for (const path in componentsContext) {
			// 获取文件中的 default 模块
			const componentConfig = componentsContext[path].default;
			app.component(componentConfig.name, componentConfig);
		}
	},
};
