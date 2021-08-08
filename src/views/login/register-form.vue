<!--
 * @Author: Rock Chang
 * @Date: 2021-08-08 14:34:51
 * @LastEditTime: 2021-08-08 14:35:25
 * @Description: 
-->
<template>
	<div class="register-content">
		<div class="social-container">
			<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
			<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
			<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
		</div>
		<span>or use your email for registration</span>
		<input type="text" placeholder="Name" />
		<input type="email" placeholder="Email" />
		<input type="password" placeholder="Password" />
		<button>Sign Up</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'register-content',
	components: {},
	props: {},
	setup() {
		return {};
	},
});
</script>

<style lang="less"></style>
