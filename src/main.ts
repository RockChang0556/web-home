import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Rui from '@/components/global'; // 自定义全局组件
import ElementPlus from '@/config/element'; // 按需加载ElementPlus

const app = createApp(App);
app.use(Rui).use(ElementPlus);
app.use(router).use(store).mount('#app');
