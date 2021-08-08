import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import Rui from '@/components/global'; // 自定义全局组件

const app = createApp(App);
app.use(Rui).use(router).use(store).mount('#app');
