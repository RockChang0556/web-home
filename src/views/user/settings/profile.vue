<!--
 * @Author: Rock Chang
 * @Date: 2021-08-13 22:38:06
 * @LastEditTime: 2021-08-18 09:14:43
 * @Description: 用户 - 设置 - 个人资料
-->
<template>
	<div class="user-settings-profile">
		<h2>个人资料</h2>
		<div class="settings-profile-content">
			<el-form
				label-position="right"
				label-width="80px"
				:model="formData"
				:rules="formRules"
				ref="profileFormRef"
				class="profile-form"
			>
				<el-form-item label="昵称" prop="name">
					<el-input
						v-model="formData.name"
						placeholder="填写你的昵称"
						maxlength="10"
						show-word-limit
					></el-input>
				</el-form-item>
				<el-form-item label="职位" prop="position">
					<el-input
						v-model="formData.position"
						placeholder="填写你的职位"
						maxlength="50"
						show-word-limit
					></el-input>
				</el-form-item>
				<el-form-item label="性别" class="profile-form-sex">
					<el-radio-group v-model="formData.sex">
						<el-radio border :label="0">妹子</el-radio>
						<el-radio border :label="1">汉子</el-radio>
						<el-radio border :label="-1">保密</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="个人介绍" prop="summary">
					<el-input
						v-model="formData.summary"
						placeholder="填写职业介绍, 喜欢的事情等等"
						type="textarea"
						maxlength="100"
						show-word-limit
						:autosize="{ minRows: 2, maxRows: 5 }"
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
			<div class="settings-avatar">
				<el-upload class="upload-demo" drag action="/api/file/upload" multiple>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<template #tip>
						<div class="el-upload__tip">
							只能上传 jpg/png 文件，且不超过 500kb
						</div>
					</template>
				</el-upload>
				<!-- <el-avatar :size="100"> 头像 </el-avatar> -->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import store from '@/store';
import { UserProps } from '@/store/modules/user';
import { UserApi } from '@/services';
import { nicknameRule } from '@/config/rule';

export default defineComponent({
	name: 'user-settings-profile',
	components: {},
	props: {
		user: {
			type: Object as PropType<UserProps>,
			default: () => ({}),
		},
	},
	setup(props) {
		const formData = reactive({
			name: props.user.name ?? '',
			position: props.user.position ?? '',
			sex: props.user.sex ?? -1,
			summary: props.user.summary ?? '',
		});
		const { formRules } = useRules();

		// 表单参数校验
		const submitBtnLoading = ref(false);
		const profileFormRef: any = ref(null);
		const onSubmitForm = () => {
			const save = async () => {
				try {
					submitBtnLoading.value = true;
					// 更新用户信息
					await UserApi.update(formData);
					// 重新获取用户信息
					await store.dispatch('user/getUserInfo');
					ElMessage.success('更新成功');
				} finally {
					submitBtnLoading.value = false;
				}
			};
			if (Number(props.user.id) < 10) {
				save();
				return;
			}
			profileFormRef.value.validate(async (valid: boolean) => {
				if (valid) {
					save();
				}
			});
		};
		return {
			formData,
			formRules,
			submitBtnLoading,
			profileFormRef,
			onSubmitForm,
		};
	},
});
// 表单规则
function useRules() {
	const formRules = {
		name: nicknameRule,
	};
	return { formRules };
}
</script>

<style lang="less">
.user-settings-profile {
	> h2 {
		margin-bottom: 20px;
	}
	.settings-profile-content {
		display: flex;
	}
	.settings-avatar {
		flex-shrink: 0;
		padding: 40px;
	}
	.profile-form {
		flex: 1;
		.el-form-item {
			padding-top: 13px;
			margin-bottom: 13px;
			border-top: 1px solid #eaeaea;
			transition: 0.3s;
			&.is-error {
				margin-bottom: 23px;
			}
			.el-form-item__label {
				font-size: 14px;
				font-weight: 500;
			}
			.el-input__inner,
			.el-textarea__inner {
				background-color: #fafafa;
				&:focus {
					background-color: #fff;
				}
			}
			.el-input__inner {
				padding-right: 46px;
			}
			.el-textarea__inner {
				padding-bottom: 20px;
			}
			.el-input__count-inner,
			.el-input__count {
				background: none;
			}
		}
		.profile-form-sex {
			.el-radio {
				margin-left: 15px;
				margin-top: 5px;
				margin-bottom: 5px;
				margin-right: 0;
				&:first-of-type {
					margin-left: 0;
				}
			}
		}
	}
}
@media only screen and (max-width: 560px) {
	.user-settings-profile {
		.settings-profile-content {
			flex-direction: column-reverse;
		}
		.settings-avatar {
			padding: 0 40px 20px;
		}
	}
}
</style>
