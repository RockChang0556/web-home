<!--
 * @Author: Rock Chang
 * @Date: 2021-08-08 14:34:51
 * @LastEditTime: 2021-08-10 18:28:44
 * @Description: 
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
			<el-form-item label="密码" prop="password">
				<el-input
					type="password"
					placeholder="密码"
					v-model="registerForm.password"
					show-password
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="confirm_password">
				<el-input
					type="password"
					placeholder="确认密码"
					v-model="registerForm.confirm_password"
					show-password
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="danger" round :loading="loading" @click="onSubmitForm">
					注册
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { UserApi } from '@/services';
import { RegisterProps } from '@/types/service';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'register-content',
	components: {},
	props: {},
	emits: ['switch-register'],
	setup(props, context) {
		const registerForm = reactive({
			name: '',
			email: '',
			password: '',
			confirm_password: '',
		});
		const { registerRules } = useRules(registerForm);

		// 注册参数校验
		const registerFormRef: any = ref(null);
		const onSubmitForm = () => {
			registerFormRef.value.validate((valid: boolean) => {
				if (valid) {
					toRegister();
				}
			});
		};

		// 注册逻辑
		const loading = ref(false);
		const toRegister = async () => {
			try {
				loading.value = true;
				await UserApi.register(registerForm);
				ElMessage.success('注册成功');
				context.emit('switch-register', false);
			} finally {
				loading.value = false;
			}
		};
		return {
			registerForm,
			registerRules,
			registerFormRef,
			onSubmitForm,
			loading,
		};
	},
});

function useRules(registerForm: RegisterProps) {
	const validateConfirmPass = (rule: any, value: any, callback: any) => {
		if (value !== registerForm.password) {
			callback(new Error('两次输入的密码不一致，请重新输入'));
		} else {
			callback();
		}
	};

	const registerRules = {
		name: [
			{ required: true, message: '请输入昵称', trigger: 'blur' },
			{
				pattern: /^([a-zA-Z0-9_\u4e00-\u9fa5]{2,10})$/,
				message: '昵称长度在2~10之间, 支持数字,字母,汉字,下划线',
				trigger: 'blur',
			},
		],
		email: [
			{ required: true, message: '请输入邮箱', trigger: 'blur' },
			{ min: 6, max: 30, message: '邮箱长度在6~30之间', trigger: 'blur' },
			{
				pattern: /(^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$)/,
				message: '邮箱格式不正确',
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
		confirm_password: [
			{ required: true, message: '请输入确认密码', trigger: 'blur' },
			{ validator: validateConfirmPass, trigger: 'blur' },
		],
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
	}
}
</style>
