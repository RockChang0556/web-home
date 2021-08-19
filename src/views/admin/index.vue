<!--
 * @Author: Rock Chang
 * @Date: 2021-08-19 14:13:33
 * @LastEditTime: 2021-08-19 18:34:49
 * @Description: 
-->

<template>
	<div class="defaults">
		admin
		<sidebar></sidebar>
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '@/components/layout/sidebar.vue';

export default defineComponent({
	name: 'defaults',
	components: { Sidebar },
	props: {},
	setup() {
		return {};
	},
});
</script>

<style lang="less"></style>

