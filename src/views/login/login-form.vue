<!--
 * @Author: Rock Chang
 * @Date: 2021-08-08 14:28:04
 * @LastEditTime: 2021-12-31 16:50:40
 * @Description: 登录表单
-->
<template>
	<div class="login-content">
		<div class="social-container">
			<a href="#" class="social"><r-icon name="QQ" /></a>
			<a href="#" class="social"><r-icon name="weixin" /></a>
			<a href="#" class="social"><r-icon name="guge" /></a>
			<span>这些我们都没有</span>
		</div>
		<span>或者账号密码登录</span>
		<el-form
			:model="loginForm"
			:rules="loginRules"
			ref="loginFormRef"
			class="login-form-elform"
			@submit.native.prevent
		>
			<el-form-item label="账号" prop="account">
				<el-input
					placeholder="手机/邮箱"
					v-model="loginForm.account"
				></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input
					type="password"
					placeholder="密码"
					v-model="loginForm.password"
					show-password
					@keyup.enter="onSubmitForm"
				></el-input>
			</el-form-item>
			<el-form-item label="图形验证码" prop="captcha" class="login-captcha">
				<el-input
					placeholder="图形验证码"
					v-model="loginForm.captcha"
				></el-input>
				<span @click="getCaptcha" v-html="captchaData"> </span>
			</el-form-item>
			<el-form-item>
				<div class="forgot-pass">
					<!-- <span
						:style="{ float: 'left', width: '30px', height: '20px' }"
						@click="setFormData({ account: 'peng0556@qq.com' })"
					></span> -->
					<update-password><a class="">忘记密码?</a></update-password>
				</div>
				<el-button
					type="danger"
					class="button"
					round
					:loading="loading"
					@click="onSubmitForm"
				>
					登录
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { UserApi } from '@/services';
import UpdatePassword from '@/components/update-password.vue';
import { getQueryString } from '@/utils/util';
import { passwordRule, captchaRule } from '@/config/rule';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash-es';

export default defineComponent({
	name: 'login-content',
	components: { UpdatePassword },
	props: {
		active: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const loginForm = reactive({
			account: '',
			password: '',
			sid: '', // 验证码uuid
			captcha: '',
		});
		const { loginRules } = useRules();
		const setFormData = (data: { account?: string; password?: string }) => {
			loginForm.account = data.account || '';
			loginForm.password = data.password || '';
		};

		// 登录参数校验
		const loginFormRef: any = ref(null);
		const onSubmitForm = () => {
			loginFormRef.value.validate((valid: boolean) => {
				if (valid) {
					toLogin();
				}
			});
		};

		// 登录逻辑
		const loading = ref(false);
		const toLogin = async () => {
			try {
				loading.value = true;
				await UserApi.login(loginForm);
				window.$message.success('登录成功');
				setTimeout(() => {
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
					loginFormRef.value.clearValidate();
				}
			}
		);

		// 获取图形验证码
		const captchaData = ref('');
		const getCaptcha = debounce(async () => {
			let sid = localStorage.getItem('captchaId');
			if (!sid) {
				sid = uuidv4() as string;
				localStorage.setItem('captchaId', sid);
			}
			loginForm.sid = sid;
			captchaData.value = await UserApi.getCaptcha({ sid });
		}, 100);

		const created = () => {
			getCaptcha();
		};
		created();
		return {
			loginForm,
			loginRules,
			loginFormRef,
			onSubmitForm,
			loading,
			getCaptcha,
			captchaData,
		};
	},
});

function useRules() {
	const validateAccount = (rule: any, value: any, callback: any) => {
		const phoneOrEmailReg =
			/(^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$)|(^1[3|4|5|7|8]\d{9}$)/;
		if (!phoneOrEmailReg.test(value)) {
			callback(new Error('手机/邮箱格式不正确'));
		} else {
			callback();
		}
	};

	const loginRules = {
		account: [
			{ required: true, message: '请输入账号', trigger: 'blur' },
			{ min: 6, max: 30, message: '账号长度在6~30之间', trigger: 'blur' },
			{ validator: validateAccount, trigger: 'blur' },
		],
		password: passwordRule,
		captcha: captchaRule,
	};
	return { loginRules };
}
</script>

<style lang="less">
.login-content {
	.login-form-elform {
		width: 100%;
		margin-top: 8px;
		.el-form-item__label {
			display: none;
		}
		.forgot-pass {
			text-align: right;
			height: 20px;
			line-height: 20px;
			margin-bottom: 8px;
			a {
				color: #409eff;
			}
		}
		.login-captcha .el-form-item__content {
			display: flex;
			> span {
				width: 120px;
				height: 50px;
				margin-left: 10px;
				transform: translateY(-5px);
				cursor: pointer;
			}
		}
	}
}
</style>
