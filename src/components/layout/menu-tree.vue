<!--
 * @Author: Rock Chang
 * @Date: 2021-08-19 17:43:53
 * @LastEditTime: 2021-08-19 18:53:15
 * @Description: 管理页面 - 左边菜单 -菜单树组件, 递归调用自己
-->

<template>
	<el-submenu
		v-if="item.children?.length > 0"
		:index="item.path"
		popper-append-to-body
	>
		<template #title>
			<i v-if="!filterIcon(item.icon)" :class="item.icon"></i>
			<img v-else :src="item.icon" class="img-icon" />
			<span>{{ item.title }}</span>
		</template>
		<menu-tree v-for="child in item.children" :key="child.path" :item="child" />
	</el-submenu>

	<el-menu-item v-else :index="item.path" @click="navigateTo(item.path)">
		<i v-if="!filterIcon(item.icon)" :class="item.icon"></i>
		<img v-else :src="item.icon" class="img-icon" />
		<template #title>
			<span class="title">{{ item.title }}</span>
		</template>
	</el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'layout-menu-tree',
	components: {},
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	setup() {
		const router = useRouter();
		const navigateTo = (path: string) => {
			router.push({ path });
		};
		const filterIcon = (icon: string) => {
			return icon.indexOf('/') !== -1;
		};
		return { navigateTo, filterIcon };
	},
});
</script>

<style lang="less"></style>

