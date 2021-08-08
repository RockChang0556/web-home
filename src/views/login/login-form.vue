<!--
 * @Author: Rock Chang
 * @Date: 2021-08-08 14:28:04
 * @LastEditTime: 2021-08-08 19:06:29
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
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="password">
				<el-input
					type="password"
					placeholder="密码"
					v-model="loginForm.password"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item>
				<div class="forgot-pass">
					<a href="#" class="">忘记密码?</a>
				</div>
				<button @click="onSubmitForm('loginForm')">提交</button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { extendsServiceAuto } from '@/services';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'login-content',
	components: {},
	props: {},
	setup() {
		const loginForm = reactive({
			account: 'peng0556@qq.com',
			password: 'a123456',
		});
		const { loginRules } = useRules();

		const loginFormRef: any = ref(null);
		const onSubmitForm = (formName: string) => {
			loginFormRef.value.validate((valid: boolean) => {
				if (valid) {
					toLogin();
				}
			});
		};
		const toLogin = async () => {
			const res = await extendsServiceAuto.login({ payload: loginForm });
			ElMessage.success(res.message);
		};
		return {
			loginFormRef,
			loginForm,
			loginRules,
			onSubmitForm,
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
	const validatePass = (rule: any, value: any, callback: any) => {
		const passReg = /^[a-zA-Z]\w{5,17}$/;
		if (!passReg.test(value)) {
			callback(
				new Error('密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线')
			);
		} else {
			callback();
		}
	};

	const loginRules = {
		account: [
			{ required: true, message: '请输入账号', trigger: 'blur' },
			{ min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
			{ validator: validateAccount, trigger: 'blur' },
		],
		password: [
			{ required: true, message: '请输入密码', trigger: 'blur' },
			{ min: 6, message: '长度在不得少于 6 个字符', trigger: 'blur' },
			{ validator: validatePass, trigger: 'blur' },
		],
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
	}
}
</style>
