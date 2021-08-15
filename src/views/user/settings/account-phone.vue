<!--
 * @Author: Rock Chang
 * @Date: 2021-08-15 17:36:23
 * @LastEditTime: 2021-08-15 18:12:12
 * @Description: 设置 - 账号设置 - 更换手机
-->
<template>
	<el-form
		label-position="right"
		:model="formData"
		:rules="formRules"
		ref="formRef"
		class="account-phone-form"
	>
		<el-form-item label="手机号" prop="phone">
			<el-input
				v-model="formData.phone"
				placeholder="填写你的手机号"
			></el-input>
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
import { phoneRule } from '@/config/rule';
import { UserProps } from '@/store/modules/user';
import { UserApi } from '@/services';
import store from '@/store';
import { ElMessage } from 'element-plus';
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
		const formData = reactive({
			phone: props.user.phone ?? '',
		});
		const { formRules } = useRules();

		const formRef: any = ref(null);
		const submitBtnLoading = ref(false);
		const onSubmitForm = () => {
			formRef.value.validate(async (valid: boolean) => {
				if (valid) {
					try {
						submitBtnLoading.value = true;
						// 更新用户信息
						await UserApi.update(formData);
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
		return { formData, formRules, formRef, submitBtnLoading, onSubmitForm };
	},
});
// 表单规则
function useRules() {
	const formRules = {
		phone: phoneRule,
	};
	return { formRules };
}
</script>

<style lang="less">
.account-phone-form {
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

