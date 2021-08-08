<!--
 * @Author: Rock Chang
 * @Date: 2021-08-08 10:25:48
 * @LastEditTime: 2021-08-08 10:36:28
 * @Description: 
-->
<template>
	<svg class="icon r-icon" aria-hidden="true">
		<use :xlink:href="iconxlink"></use>
	</svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
	name: 'r-icon',
	components: {},
	props: {
		name: {
			require: true,
			type: String,
		},
	},
	setup(props) {
		const iconxlink = computed(() => `#icon-${props.name}`);
		return {
			iconxlink,
		};
	},
});
</script>

<style lang="less"></style>
