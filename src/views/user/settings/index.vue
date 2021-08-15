<!--
 * @Author: Rock Chang
 * @Date: 2021-08-13 21:52:17
 * @LastEditTime: 2021-08-15 18:18:05
 * @Description: 用户个人信息设置
-->
<template>
	<div class="user-settings">
		<global-header :user="currentUser"></global-header>
		<el-tabs
			:tab-position="isLargeScreen ? 'left' : 'top'"
			class="user-settings-tabs"
			v-if="currentUser.isFetched"
			model-value="1"
		>
			<el-tab-pane name="1">
				<template #label>
					<span><i class="el-icon-s-custom"></i> 个人信息</span>
				</template>
				<profile :user="currentUser"></profile>
			</el-tab-pane>
			<el-tab-pane name="2">
				<template #label>
					<span><i class="el-icon-s-operation"></i> 账号设置</span>
				</template>
				<account :user="currentUser"></account>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import GlobalHeader from '@/components/layout/header.vue';
import Profile from './profile.vue';
import Account from './account.vue';
import { useMediaQuery } from '@vueuse/core';

export default defineComponent({
	name: 'user-settings',
	components: {
		GlobalHeader,
		Profile,
		Account,
	},
	props: {},
	setup() {
		const store = useStore();
		const currentUser = computed(() => store.state.user.userInfo);
		const isLargeScreen = useMediaQuery('(min-width: 768px)');
		return { currentUser, isLargeScreen };
	},
});
</script>

<style lang="less">
.user-settings {
	padding-top: 70px;
	.user-settings-tabs {
		max-width: 1200px;
		min-width: 480px;
		margin: 20px auto;
		&.el-tabs--left {
			overflow: inherit;
			& > div {
				min-height: 500px;
			}
		}
		.el-tabs__header,
		.el-tabs__content {
			padding: 20px;
			background: #fff;
			box-shadow: var(--el-box-shadow-light);
		}
		.el-tabs__header {
			.el-tabs__item {
				padding: 5px 20px;
				height: 50px;
				font-size: 16px;
				transition: 0.3s;
				&.is-active {
					background: #ecf5ff;
				}
			}
		}
	}
}
</style>

