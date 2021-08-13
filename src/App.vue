<!--
 * @Author: Rock Chang
 * @Date: 2021-08-05 11:31:57
 * @LastEditTime: 2021-08-12 20:21:45
 * @Description: 
-->
<template>
	<transition name="el-fade-in-linear">
		<router-view></router-view>
	</transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
	components: {},
});
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	text-emphasis: none;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
