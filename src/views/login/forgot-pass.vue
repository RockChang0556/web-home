<!--
 * @Author: Rock Chang
 * @Date: 2021-08-12 20:26:57
 * @LastEditTime: 2021-08-13 12:18:00
 * @Description:  忘记密码
-->
<template>
	<span class="forgot-pass-btn" @click="onChangeVisible(true)">
		<slot>打开嵌套表格的 Dialog</slot>
	</span>

	<el-dialog
		title="邮箱重置密码"
		v-model="visible"
		append-to-body
		custom-class="forgot-pass-dialog"
		width="400px"
		top="20vh"
		:close-on-click-modal="false"
		destroy-on-close
	>
		<el-form
			:model="forgotPassForm"
			:rules="forgotPassRules"
			ref="forgotPassFormRef"
			class="forgot-pass-elform"
			@submit.native.prevent
		>
			<el-form-item label="账号" prop="email">
				<el-input placeholder="邮箱" v-model="forgotPassForm.email"></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="code" class="pass-code">
				<el-input placeholder="验证码" v-model="forgotPassForm.code"></el-input>
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
					placeholder="密码"
					v-model="forgotPassForm.password"
					show-password
				></el-input>
			</el-form-item>
			<el-form-item class="submit-btns">
				<el-button
					type="danger"
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

export default defineComponent({
	name: 'defaults',
	components: {},
	props: {},
	setup() {
		const { visible, onChangeVisible } = useSwitchDialog();
		const forgotPassForm = reactive({
			email: '',
			code: '',
			password: '',
		});
		const { forgotPassRules } = useRules();

		// 表单参数校验
		const submitBtnLoading = ref(false);
		const forgotPassFormRef: any = ref(null);
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

		// 发送验证码
		const { sendBtn, onClickSendBtn } = useSendCode(
			forgotPassFormRef,
			forgotPassForm
		);
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
		};
	},
});

// 打开/关闭弹框
function useSwitchDialog() {
	const visible = ref(true);
	const onChangeVisible = (isLogin: boolean) => {
		visible.value = isLogin;
	};
	return {
		visible,
		onChangeVisible,
	};
}
// 表单规则
function useRules() {
	const forgotPassRules = {
		email: [
			{ required: true, message: '请输入邮箱', trigger: 'blur' },
			{ min: 6, max: 30, message: '邮箱长度在6~30之间', trigger: 'blur' },
			{
				pattern: /(^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$)/,
				message: '邮箱格式不正确',
				trigger: 'blur',
			},
		],
		code: [
			{ required: true, message: '请输入验证码', trigger: 'blur' },
			{
				pattern: /^[0-9]{4}$/,
				message: '验证码为4位数字',
				trigger: 'blur',
			},
		],
		password: [
			{ required: true, message: '请输入密码', trigger: 'blur' },
			{
				pattern: /^[\w#@!~%^&*]{6,18}$/,
				message: '密码长度在6~18之间，支持字母、数字,特殊字符',
				trigger: 'blur',
			},
		],
	};
	return { forgotPassRules };
}

// 发送验证码
function useSendCode(
	forgotPassFormRef: any,
	forgotPassForm: { email: string; code: string; password: string }
) {
	const sendBtn = reactive({
		loading: false,
		text: '点击发送验证码',
		time: 60,
		disabled: false,
	});
	const onClickSendBtn = () => {
		forgotPassFormRef.value.validateField('email', async (errMsg: string) => {
			if (!errMsg) {
				try {
					sendBtn.loading = true;
					await UserApi.getEmailCode({
						email: forgotPassForm.email,
						reason: '修改密码',
					});
					ElMessage.success('验证码成功发送至您的邮箱, 请注意查收');
					// 按钮倒计时
					const countDown = setInterval(() => {
						if (sendBtn.time < 1) {
							sendBtn.text = '点击发送验证码';
							sendBtn.time = 60;
							sendBtn.disabled = false;
							clearInterval(countDown);
						} else {
							sendBtn.disabled = true;
							sendBtn.text = `${sendBtn.time--}s后重新发送`;
						}
					}, 1000);
				} catch (error) {
				} finally {
					sendBtn.loading = false;
				}
			}
		});
	};
	return { sendBtn, onClickSendBtn };
}
</script>

<style lang="less">
.forgot-pass-btn {
	cursor: pointer;
}
.forgot-pass-dialog {
	.forgot-pass-elform {
		.el-form-item__label {
			display: none;
		}
		.pass-code .el-form-item__content {
			display: flex;
			justify-content: space-between;
			.el-input {
				width: 220px;
			}
			.el-button {
				margin-left: 20px;
				font-weight: normal;
			}
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
</style>
