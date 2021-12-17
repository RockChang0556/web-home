<!--
 * @Author: Rock Chang
 * @Date: 2021-08-12 20:26:57
 * @LastEditTime: 2021-12-17 14:42:39
 * @Description:  重置密码
-->
<template>
	<span class="update-password-btn" @click="onChangeVisible(true)">
		<slot>打开嵌套表格的 Dialog</slot>
	</span>

	<el-dialog
		title="邮箱重置密码"
		v-model="visible"
		append-to-body
		custom-class="update-password-dialog"
		width="400px"
		top="20vh"
		:close-on-click-modal="false"
		@close="resetForm"
	>
		<el-form
			:model="forgotPassForm"
			:rules="forgotPassRules"
			ref="forgotPassFormRef"
			class="update-password-elform"
			@submit.native.prevent
		>
			<el-form-item label="账号" prop="email">
				<el-input
					placeholder="邮箱"
					v-model="forgotPassForm.email"
					:disabled="!!email"
				></el-input>
			</el-form-item>
			<el-form-item label="邮箱验证码" prop="code" class="pass-code">
				<el-input
					placeholder="邮箱验证码"
					v-model="forgotPassForm.code"
				></el-input>
				<el-button
					type="text"
					@click="onClickSendBtn"
					:loading="sendBtn.loading"
					:disabled="sendBtn.disabled"
					>{{ sendBtn.text }}
				</el-button>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input
					type="password"
					placeholder="新密码"
					v-model="forgotPassForm.password"
					show-password
				></el-input>
			</el-form-item>
			<el-form-item class="submit-btns">
				<el-button
					:type="email ? 'primary' : 'danger'"
					round
					:loading="submitBtnLoading"
					@click="onSubmitForm"
				>
					确认修改
				</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { UserApi } from '@/services';
import { emailRule, codeRule, passwordRule } from '@/config/rule';
import { useSendCode } from '@/hooks/useSendCode';

export default defineComponent({
	name: 'update-password-dialog',
	components: {},
	props: {
		email: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const forgotPassFormRef: any = ref(null);
		const { visible, onChangeVisible } = useSwitchDialog();
		const forgotPassForm = reactive({
			email: props.email ?? '',
			code: '',
			password: '',
		});
		const { forgotPassRules } = useRules();

		// 表单参数校验
		const submitBtnLoading = ref(false);
		const onSubmitForm = () => {
			forgotPassFormRef.value.validate(async (valid: boolean) => {
				if (valid) {
					try {
						submitBtnLoading.value = true;
						await UserApi.updatePassword(forgotPassForm);
						ElMessage.success('密码修改成功');
						onChangeVisible(false);
					} catch (error) {
					} finally {
						submitBtnLoading.value = false;
					}
				}
			});
		};

		// 发送验证码前置校验邮箱是否注册, 返回true继续执行
		const validatorEamil = async () => {
			if (props.email) return true; // 设置页修改密码, 邮箱禁用, 肯定注册了
			const { has_user } = await UserApi.getIsRegister({
				email: forgotPassForm.email,
			});
			if (has_user) {
				return true;
			} else {
				ElMessage.error('该邮箱尚未注册!');
				return false;
			}
		};

		// 发送验证码
		const { sendBtn, onClickSendBtn } = useSendCode(
			forgotPassFormRef,
			forgotPassForm,
			'修改密码',
			validatorEamil
		);

		// 重置表单
		const resetForm = () => {
			forgotPassFormRef.value.resetFields();
		};
		return {
			visible,
			onChangeVisible,
			forgotPassRules,
			forgotPassForm,
			forgotPassFormRef,
			submitBtnLoading,
			onSubmitForm,
			onClickSendBtn,
			sendBtn,
			resetForm,
		};
	},
});

// 打开/关闭弹框
function useSwitchDialog() {
	const visible = ref(false);
	const onChangeVisible = (val: boolean) => {
		visible.value = val;
	};
	return {
		visible,
		onChangeVisible,
	};
}
// 表单规则
function useRules() {
	const forgotPassRules = {
		email: emailRule,
		code: codeRule,
		password: passwordRule,
	};
	return { forgotPassRules };
}
</script>

<style lang="less">
.update-password-btn {
	cursor: pointer;
}
.update-password-dialog {
	.update-password-elform {
		.el-form-item__label {
			display: none;
		}

		.submit-btns {
			margin-bottom: 0;
			padding-top: 10px;
			.el-form-item__content {
				text-align: center;
			}
		}
	}
}
.el-form {
	.pass-code .el-form-item__content {
		display: flex;
		justify-content: space-between;
		.el-input {
			width: calc(100% - 140px);
		}
		.el-button {
			margin-left: 20px;
			font-weight: normal;
		}
	}
}
</style>
