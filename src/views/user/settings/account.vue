<!--
 * @Author: Rock Chang
 * @Date: 2021-08-14 15:31:20
 * @LastEditTime: 2021-08-15 18:12:59
 * @Description: 用户 - 设置 - 账号设置
-->
<template>
	<div class="user-settings-account">
		<h2>账号设置</h2>
		<div class="settings-account-content">
			<div class="account-item">
				<span class="label">手机号</span>
				<span class="status">
					{{ user.phone || '未绑定' }}
				</span>
				<el-button type="text" @click="onClickBtn('phone')">
					{{ user.phone ? '换绑' : '绑定' }}
				</el-button>
			</div>
			<div class="account-item">
				<span class="label">邮箱</span>
				<span class="status">
					{{ user.email || '未绑定' }}
				</span>
				<el-button type="text" @click="onClickBtn('email')">重置</el-button>
			</div>
			<div class="account-item">
				<span class="label">密码</span>
				<span class="status"> </span>
				<update-password :email="user.email">
					<el-button type="text">重置</el-button>
				</update-password>
			</div>
		</div>
	</div>

	<el-dialog
		:title="dialogConf.title"
		:model-value="!!dialogConf.type"
		append-to-body
		custom-class="settings-account-dialog"
		width="400px"
		top="20vh"
		:close-on-click-modal="false"
		destroy-on-close
		@close="dialogConf.type = ''"
	>
		<component
			:is="`account-${dialogConf.type}`"
			@close="dialogConf.type = ''"
		></component>
	</el-dialog>
</template>

<script lang="ts">
import { UserProps } from '@/store/modules/user';
import { defineComponent, PropType, reactive, ref } from 'vue';
import UpdatePassword from '@/components/update-password.vue';
import AccountEmail from './account-email.vue';
import AccountPhone from './account-phone.vue';

export default defineComponent({
	name: 'user-settings-account',
	components: { UpdatePassword, AccountEmail, AccountPhone },
	props: {
		user: {
			type: Object as PropType<UserProps>,
			default: () => ({}),
		},
	},
	setup() {
		const dialogConf = reactive({
			type: '',
			title: '',
		});
		const onClickBtn = (key: 'phone' | 'email') => {
			const titleMap = {
				phone: '换绑/绑定手机',
				email: '重置邮箱',
			};
			dialogConf.type = key;
			dialogConf.title = titleMap[key];
		};
		return { onClickBtn, dialogConf };
	},
});
</script>

<style lang="less">
.user-settings-account {
	> h2 {
		margin-bottom: 20px;
	}
	.settings-account-content {
		border-bottom: 1px solid #f1f1f1;
		.account-item {
			display: flex;
			align-items: center;
			padding: 1rem 0;
			border-top: 1px solid #f1f1f1;
			font-size: 14px;
			.label {
				width: 100px;
				flex-shrink: 0;
			}
			.status {
				flex: 1;
				color: #909090;
			}
			.el-button {
				width: 40px;
				flex-shrink: 0;
			}
		}
	}
}
</style>
