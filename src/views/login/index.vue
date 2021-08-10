<template>
	<div class="global-login">
		<div class="container" :class="{ 'register-active': isRegisterActive }">
			<div class="form-container sign-up-container">
				<div class="form-container-cont">
					<h1>创建账号</h1>
					<register-form @switch-register="onSwitchRegister"></register-form>
				</div>
			</div>
			<div class="form-container sign-in-container">
				<div class="form-container-cont">
					<h1>登录</h1>
					<login-form></login-form>
				</div>
			</div>
			<div class="overlay-container">
				<div class="overlay">
					<div class="overlay-panel overlay-left">
						<h1>Welcome Back!</h1>
						<p>
							To keep connected with us please login with your personal info
						</p>
						<button class="ghost" @click="onSwitchRegister(false)">
							去登录
						</button>
					</div>
					<div class="overlay-panel overlay-right">
						<h1>Hello, Friend!</h1>
						<p>第一次来吗? 先注册个账号呗</p>
						<button class="ghost" @click="onSwitchRegister(true)">
							去注册
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginForm from './login-form.vue';
import RegisterForm from './register-form.vue';
export default defineComponent({
	name: 'global-login',
	components: {
		LoginForm,
		RegisterForm,
	},
	props: {},
	setup() {
		// 切换登录/注册
		const { isRegisterActive, onSwitchRegister } = useLoginOrRegister();
		return {
			isRegisterActive,
			onSwitchRegister,
		};
	},
});

// 切换登录/注册
function useLoginOrRegister() {
	const isRegisterActive = ref(false);
	const onSwitchRegister = (isLogin: boolean) => {
		isRegisterActive.value = isLogin;
	};
	return {
		isRegisterActive,
		onSwitchRegister,
	};
}
</script>

<style lang="less">
// @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
.global-login {
	width: 100vw;
	background: #f6f5f7;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;

	p {
		font-size: 14px;
		font-weight: 300;
		line-height: 20px;
		letter-spacing: 0.5px;
		margin: 20px 0 30px;
	}

	span {
		font-size: 12px;
	}

	a {
		color: #333;
		font-size: 14px;
		text-decoration: none;
		margin: 15px 0;
	}

	button {
		border-radius: 20px;
		border: 1px solid #ff4b2b;
		background-color: #ff4b2b;
		color: #ffffff;
		font-size: 12px;
		font-weight: bold;
		width: 120px;
		height: 40px;
		letter-spacing: 1px;
		text-transform: uppercase;
		transition: transform 80ms ease-in;
		cursor: pointer;
		transition: 0.3s;
		&:active {
			transform: scale(0.95);
		}
		&:hover {
			background-color: none;
			width: 140px;
		}
		&:focus {
			outline: none;
		}
		&.ghost {
			background-color: transparent;
			border-color: #ffffff;
			&:hover {
				opacity: 0.9;
			}
		}
	}

	.form-container-cont {
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 0 35px;
		height: 100%;
		text-align: center;
		> div {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
	}

	.container {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		position: relative;
		overflow: hidden;
		width: 768px;
		max-width: 100%;
		min-height: 480px;
	}

	.form-container {
		position: absolute;
		top: 0;
		height: 100%;
		transition: all 0.6s ease-in-out;
	}

	.sign-in-container {
		left: 0;
		width: 50%;
		z-index: 2;
	}

	.container.register-active .sign-in-container {
		transform: translateX(100%);
	}

	.sign-up-container {
		left: 0;
		width: 50%;
		opacity: 0;
		z-index: 1;
	}

	.container.register-active .sign-up-container {
		transform: translateX(100%);
		opacity: 1;
		z-index: 5;
		animation: show 0.6s;
	}

	@keyframes show {
		0%,
		49.99% {
			opacity: 0;
			z-index: 1;
		}

		50%,
		100% {
			opacity: 1;
			z-index: 5;
		}
	}

	.overlay-container {
		position: absolute;
		top: 0;
		left: 50%;
		width: 50%;
		height: 100%;
		overflow: hidden;
		transition: transform 0.6s ease-in-out;
		z-index: 100;
	}

	.container.register-active .overlay-container {
		transform: translateX(-100%);
	}

	.overlay {
		background: #ff416c;
		background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
		background: linear-gradient(to right, #ff4b2b, #ff416c);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0 0;
		color: #ffffff;
		position: relative;
		left: -100%;
		height: 100%;
		width: 200%;
		transform: translateX(0);
		transition: transform 0.6s ease-in-out;
	}

	.container.register-active .overlay {
		transform: translateX(50%);
	}

	.overlay-panel {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		// padding: 0 40px;
		text-align: center;
		top: 0;
		height: 100%;
		width: 50%;
		transform: translateX(0);
		transition: transform 0.6s ease-in-out;
	}

	.overlay-left {
		transform: translateX(-20%);
	}

	.container.register-active .overlay-left {
		transform: translateX(0);
	}

	.overlay-right {
		right: 0;
		transform: translateX(0);
	}

	.container.register-active .overlay-right {
		transform: translateX(20%);
	}

	.social-container {
		margin: 20px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		a {
			border: 1px solid #dddddd;
			border-radius: 50%;
			display: inline-block;
			margin: 0 5px;
			height: 40px;
			width: 40px;
			line-height: 40px;
			font-size: 22px;
			transition: 0.3s;
			&:hover {
				border-color: #ff4b2b;
			}
		}
	}
}
</style>
