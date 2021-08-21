<!--
 * @Author: Rock Chang
 * @Date: 2021-08-20 18:01:56
 * @LastEditTime: 2021-08-21 17:46:58
 * @Description: 头像组件
-->

<template>
	<div class="com-avatar">
		<el-avatar v-if="!edit" :size="size" :src="avatarUrl">
			<img :src="avatarDefaultUrl" />
		</el-avatar>
		<el-upload
			v-else
			v-loading="uploading"
			action="#"
			element-loading-background="rgba(0, 0, 0, 0.3)"
			class="avatar-uploader"
			:show-file-list="false"
			:before-upload="beforeAvatarUpload"
			:http-request="handleAvatarRequest"
		>
			<el-avatar :size="size" :src="avatarUrl">
				<img :src="avatarDefaultUrl" />
			</el-avatar>
			<div class="mark">
				<i class="el-icon-edit"></i>
			</div>
		</el-upload>
	</div>

	<!-- 图片裁剪 -->
	<el-dialog
		center
		title="裁剪"
		width="300px"
		:append-to-body="true"
		:close-on-click-modal="false"
		:model-value="cropData.visible"
		custom-class="croppa-dialog"
		@close="onCloseCropDialog"
	>
		<div style="text-align: center">
			<div class="avatar-croppa-container">
				<vue-picture-cropper
					:boxStyle="{
						width: '100%',
						height: '100%',
						margin: 'auto',
						backgroundColor: '#f8f8f8',
					}"
					:img="cropData.imgUrl"
					:options="{
						viewMode: 1, // 限制裁剪框不超过画布的大小
						aspectRatio: 1, // 头像使用长宽比为 1 裁剪
					}"
				/>
			</div>
			<div style="margin-top: 1em">通过鼠标滚轮调节头像大小</div>
		</div>

		<template #footer>
			<div class="dialog-footer">
				<el-button @click="onCloseCropDialog" size="small"> 取 消 </el-button>
				<el-button type="primary" @click="handleCrop" size="small">
					确 定
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts">
// @ts-ignore vite项目由于基于esm打包,需从/dist/esm导入
import VuePictureCropper, { cropper } from 'vue-picture-cropper/dist/esm';
import { computed, defineComponent, reactive, ref } from 'vue';
import { avatarDefaultUrl } from '@/config/constants';
import { ElMessage } from 'element-plus';
import { UserApi } from '@/services';
import store from '@/store';

export default defineComponent({
	name: 'com-avatar',
	components: { VuePictureCropper },
	props: {
		// 头像地址
		src: {
			type: String,
			default: '',
		},
		// 头像大小
		size: {
			type: Number,
			default: 36,
		},
		// 是否支持编辑
		edit: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const avatarUrl = computed(
			() => `${import.meta.env.VITE_FILE_BASE}${props.src}`
		);
		// 上传前验证
		const beforeAvatarUpload = (file: any) => {
			// 验证文件大小
			const isBigger = file.size > 1024 * 1024 * 1;
			if (isBigger) {
				ElMessage.error('上传头像图片大小不能超过 1MB!');
				return false;
			}
			// 验证格式是否支持
			const notFormat = file.type.indexOf('image') === -1;
			if (notFormat) {
				ElMessage.error('上传头像图片只能是图片格式!');
				return false;
			}
			// 验证图像是否符合要求
			const imgSrc = window.URL.createObjectURL(file);
			const image = new Image();
			image.src = imgSrc;
			image.onload = () => {
				const w = image.width;
				const h = image.height;
				if (w < 50) {
					ElMessage.error('图像宽度过小, 请选择大于50px的图像');
					return false;
				}
				if (h < 50) {
					ElMessage.error('图像高度过小, 请选择大于50px的图像');
					return false;
				}
				// 验证通过, 打开裁剪框
				cropData.imgUrl = imgSrc;
				cropData.visible = true;
				return true;
			};
			image.onerror = () => {
				ElMessage.error('获取本地图片出现错误, 请重试');
			};
			return true;
		};
		const handleAvatarRequest = (file: any) => {
			// 不写这个空函数 el-upload会请求一次undefined资源
			return true;
		};

		// 处理裁剪后的图片, 并上传至服务器
		const uploading = ref(false);
		const handleCrop = async () => {
			cropData.visible = false;
			// 获取裁剪数据
			const blob: Blob = cropper.getBlob();
			// 构造为文件对象
			const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
			const formdata = new FormData();
			formdata.append('file', file);
			try {
				uploading.value = true;
				// step1: 上传头像
				const { data } = await UserApi.uplaodAvatar(formdata);
				// step2: 更换用户头像
				await UserApi.update({ avatar_id: data.id, avatar_url: data.path });
				// step3: 重新获取用户信息
				await store.dispatch('user/getUserInfo');
				ElMessage.success('更新头像成功');
			} catch (error) {
				ElMessage.success('更新头像失败');
			} finally {
				uploading.value = false;
			}
		};

		const onCloseCropDialog = () => {
			cropData.visible = false;
		};

		// 裁剪弹框
		const cropData = reactive({ imgUrl: '', visible: false });
		return {
			avatarUrl,
			avatarDefaultUrl,
			beforeAvatarUpload,
			handleAvatarRequest,
			cropData,
			handleCrop,
			onCloseCropDialog,
			uploading,
		};
	},
});
</script>

<style lang="less">
.com-avatar {
	display: flex;
	border-radius: 50%;
	.el-avatar {
		background: none;
	}
	.el-upload {
		box-shadow: var(--el-box-shadow-light);
		display: flex;
		position: relative;
		overflow: hidden;
		border-radius: 50%;
		&:hover .mark {
			opacity: 1;
		}
		.mark {
			position: absolute;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.3);
			color: #fff;
			font-size: 24px;
			display: flex;
			justify-content: center;
			align-items: center;
			opacity: 0;
			transition: 0.3s;
		}
	}
}
</style>

