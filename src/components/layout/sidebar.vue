<!--
 * @Author: Rock Chang
 * @Date: 2021-08-19 17:35:11
 * @LastEditTime: 2021-08-19 18:49:02
 * @Description:  管理页面 - 左边菜单
-->

<template>
	<div class="layout-sidebar">
		<el-menu
			ref="meun"
			class="el-menu-vertical-demo"
			:default-active="defaultActive"
			:collapse="false"
		>
			<menu-tree
				v-for="item in sideList"
				:key="item.path"
				:item="item"
			></menu-tree>
		</el-menu>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import MenuTree from './menu-tree.vue';
export default defineComponent({
	name: 'layout-sidebar',
	components: { MenuTree },
	props: {},
	setup() {
		const store = useStore();
		const route = useRoute();
		// 当前选中
		const defaultActive = computed(() => route.path);
		// 菜单树
		const sideList = computed(() => store.getters['route/sideList']);
		return { sideList, defaultActive };
	},
});
</script>

<style lang="less"></style>

