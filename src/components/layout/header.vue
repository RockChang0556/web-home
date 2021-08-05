<template>
	<div class="global-header">
		<router-link class="header-logo" to="/">
			<img src="/logo.png" alt="logo" />
		</router-link>
		<div v-if="!user.id">
			<router-link to="/login" class="btn btn-success mr-2"> 登录 </router-link>
			<router-link to="/register" class="btn btn-outline-light">
				注册
			</router-link>
		</div>
		<dropdown v-else>
			{{ user.name }}
			<template #menu>
				<a class="dropdown-item" href="#" @click.prevent="logout">退出登录</a>
			</template>
		</dropdown>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { UserProps } from '@/store/modules/user';
export default defineComponent({
	name: 'global-header',
	components: {},
	props: {
		user: {
			type: Object as PropType<UserProps>,
			default: () => ({}),
		},
	},
	setup() {
		const store = useStore();
		const logout = () => {
			store.dispatch('user/logout');
		};
		return {
			logout,
		};
	},
});
</script>

<style lang="less">
.global-header {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	height: 70px;
	line-height: 70px;
	padding: 8px 2rem;
	background-color: white;
	border-top: 4px solid mix(purple, white);
	display: flex;
	justify-content: space-between;
	.header-logo {
		img {
			height: 50px;
		}
	}
}
</style>
