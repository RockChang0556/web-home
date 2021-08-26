<!--
 * @Author: Rock Chang
 * @Date: 2021-08-08 14:34:51
 * @LastEditTime: 2021-08-26 18:05:37
 * @Description:  注册表单
-->
<template>
	<div class="register-content">
		<!-- <div class="social-container">
			<a href="#" class="social"><r-icon name="QQ" /></a>
			<a href="#" class="social"><r-icon name="weixin" /></a>
			<a href="#" class="social"><r-icon name="guge" /></a>
			<span>这些我们都没有</span>
		</div> -->
		<!-- <span>或者使用你的邮箱来注册</span> -->
		<span>目前仅支持邮箱注册</span>
		<el-form
			:model="registerForm"
			:rules="registerRules"
			ref="registerFormRef"
			class="register-form-elform"
			@submit.native.prevent
		>
			<el-form-item label="昵称" prop="name">
				<el-input
					placeholder="昵称"
					v-model="registerForm.name"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input
					placeholder="邮箱"
					v-model="registerForm.email"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="code" class="pass-code">
				<el-input placeholder="验证码" v-model="registerForm.code"></el-input>
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
					v-model="registerForm.password"
					show-password
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item>
				<el-button
					type="danger"
					class="button"
					round
					:loading="loading"
					@click="onSubmitForm"
				>
					注册并登录
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { UserApi } from '@/services';
import { ElMessage } from 'element-plus';
import { emailRule, codeRule, passwordRule, nicknameRule } from '@/config/rule';
import { useSendCode } from '@/hooks/useSendCode';
import { getQueryString } from '@/utils/util';

export default defineComponent({
	name: 'register-content',
	components: {},
	props: {
		active: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, context) {
		const registerForm = reactive({
			name: '',
			email: '',
			code: '',
			password: '',
		});
		const { registerRules } = useRules();
		const setFormData = (data: {
			name?: string;
			email?: string;
			code?: string;
			password?: string;
		}) => {
			registerForm.name = data.name || '';
			registerForm.email = data.email || '';
			registerForm.code = data.code || '';
			registerForm.password = data.password || '';
		};

		// 注册参数校验
		const registerFormRef: any = ref(null);
		const onSubmitForm = () => {
			registerFormRef.value.validate((valid: boolean) => {
				if (valid) {
					toRegister();
				}
			});
		};

		// 验证码逻辑
		const { sendBtn, onClickSendBtn } = useSendCode(
			registerFormRef,
			registerForm,
			'注册账号'
		);

		// 注册逻辑
		const loading = ref(false);
		const toRegister = async () => {
			try {
				loading.value = true;
				await UserApi.register(registerForm);
				ElMessage.success('注册成功, 即将为您自动登录');
				setTimeout(async () => {
					await UserApi.login({
						account: registerForm.email,
						password: registerForm.password,
					});
					ElMessage.success('登录成功');
					const redirectUrl = getQueryString('redirect_uri');
					location.href = redirectUrl || location.origin;
				}, 1000);
			} finally {
				loading.value = false;
			}
		};

		// 监听是否当前tab, 离开当前tab清空表单值
		watch(
			() => props.active,
			(val: boolean) => {
				if (!val) {
					setFormData({});
					registerFormRef.value.clearValidate();
				}
			}
		);

		return {
			registerForm,
			registerRules,
			registerFormRef,
			onSubmitForm,
			loading,
			sendBtn,
			onClickSendBtn,
		};
	},
});

function useRules() {
	const registerRules = {
		name: nicknameRule,
		email: emailRule,
		code: codeRule,
		password: passwordRule,
	};
	return { registerRules };
}
</script>


<style lang="less">
.register-content {
	.register-form-elform {
		width: 100%;
		margin-top: 8px;
		.el-form-item__label {
			display: none;
		}
		.pass-code .el-form-item__content {
			.el-button {
				span {
					font-size: 14px;
				}
			}
		}
	}
}
</style>
