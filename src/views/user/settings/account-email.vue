<!--
 * @Author: Rock Chang
 * @Date: 2021-08-15 17:36:23
 * @LastEditTime: 2021-08-15 18:13:53
 * @Description: 设置 - 账号设置 - 更换邮箱
-->
<template>
	<el-form
		label-position="right"
		:model="formData"
		:rules="formRules"
		ref="formRef"
		class="account-email-form"
	>
		<el-form-item label="账号" prop="email">
			<el-input placeholder="请输入新邮箱" v-model="formData.email"></el-input>
		</el-form-item>
		<el-form-item label="验证码" prop="code" class="pass-code">
			<el-input placeholder="验证码" v-model="formData.code"></el-input>
			<el-button
				type="text"
				@click="onClickSendBtn"
				:loading="sendBtn.loading"
				:disabled="sendBtn.disabled"
				>{{ sendBtn.text }}
			</el-button>
		</el-form-item>
		<el-form-item class="submit-btns">
			<el-button
				type="primary"
				round
				:loading="submitBtnLoading"
				@click="onSubmitForm"
			>
				保存修改
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue';
import store from '@/store';
import { emailRule, codeRule } from '@/config/rule';
import { UserProps } from '@/store/modules/user';
import { UserApi } from '@/services';
import { ElMessage } from 'element-plus';
import { useSendCode } from '@/components/update-password.vue';
export default defineComponent({
	name: 'account-phone',
	components: {},
	props: {
		user: {
			type: Object as PropType<UserProps>,
			default: () => ({}),
		},
	},
	emits: ['close'],
	setup(props, context) {
		const formRef: any = ref(null);
		const formData = reactive({
			email: '',
			code: '',
		});
		const { formRules } = useRules();

		const { sendBtn, onClickSendBtn } = useSendCode(
			formRef,
			formData,
			'更换邮箱'
		);
		const submitBtnLoading = ref(false);
		const onSubmitForm = () => {
			formRef.value.validate(async (valid: boolean) => {
				if (valid) {
					try {
						submitBtnLoading.value = true;
						// 更新用户信息
						await UserApi.update({ email: formData.email });
						// 重新获取用户信息
						await store.dispatch('user/getUserInfo');
						ElMessage.success('更新成功');
						context.emit('close');
					} finally {
						submitBtnLoading.value = false;
					}
				}
			});
		};
		return {
			formData,
			formRules,
			formRef,
			submitBtnLoading,
			onSubmitForm,
			sendBtn,
			onClickSendBtn,
		};
	},
});
// 表单规则
function useRules() {
	const formRules = {
		email: emailRule,
		code: codeRule,
	};
	return { formRules };
}
</script>

<style lang="less">
.account-email-form {
	.el-form-item__label {
		display: none;
	}
	.submit-btns {
		margin-bottom: 10px;
		.el-form-item__content {
			text-align: center;
		}
	}
}
</style>

