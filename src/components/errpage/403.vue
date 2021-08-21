<!--
 * @Author: Rock Chang
 * @Date: 2021-08-21 18:25:13
 * @LastEditTime: 2021-08-21 18:35:06
 * @Description: 
-->

<template>
	<div class="errpage-403">
		<el-empty description="你还没有此页面的权限哦">
			<router-link to="/">
				<el-button type="primary">回到首页</el-button>
			</router-link>
		</el-empty>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'errpage-403',
	components: {},
	props: {},
	setup() {
		return {};
	},
});
</script>

<style lang="less"></style>

