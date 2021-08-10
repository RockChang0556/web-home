<template>
	<div class="global-header">
		<router-link class="header-logo" to="/">
			<img src="/logo.png" alt="logo" />
		</router-link>
		<div v-if="!user.id">
			<router-link to="/login">
				<el-button type="danger" plain>登录</el-button>
			</router-link>
		</div>
		<el-dropdown v-else>
			<span class="el-dropdown-link">
				{{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item @click.prevent="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
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
	align-items: center;
	.header-logo {
		height: 50px;
		img {
			height: 100%;
		}
	}
	.el-button span {
		letter-spacing: 5px;
		padding-left: 4px;
	}
	.el-dropdown {
		min-width: 80px;
		padding: 5px 0;
		.el-dropdown-link {
			float: right;
			cursor: pointer;
		}
	}
}
</style>
