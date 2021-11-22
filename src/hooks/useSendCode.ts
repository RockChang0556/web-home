/*
 * @Author: Rock Chang
 * @Date: 2021-08-16 09:47:21
 * @LastEditTime: 2021-11-11 16:14:59
 * @Description: 发送验证码
 */
import { UserApi } from '@/services';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

/** 发送验证码
 * @param {*}
 * formRef {ref} 校验邮箱用
 * formData {object} email字段必填, 其他随意
 * reason {string} 邮件目的
 * beforeSend {function} 发送邮件前置函数, 返回true继续执行, 返回false不发送邮件
 * @return {*}
 */
export function useSendCode(
	formRef: any,
	formData: { email: string; [key: string]: any },
	reason: string,
	beforeSend?: () => Promise<boolean>
) {
	const sendBtn = reactive({
		loading: false,
		text: '点击发送验证码',
		time: 60,
		disabled: false,
	});
	const onClickSendBtn = async () => {
		formRef.value.validateField('email', async (errMsg: string) => {
			if (!errMsg) {
				if (beforeSend instanceof Function && !(await beforeSend())) {
					return;
				}
				try {
					sendBtn.loading = true;
					await UserApi.getEmailCode({
						email: formData.email,
						reason,
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
