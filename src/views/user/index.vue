<!--
 * @Author: Rock Chang
 * @Date: 2021-08-21 17:26:16
 * @LastEditTime: 2023-03-17 16:39:15
 * @Description: 
-->
<template>
	<div class="user-wrap">
		<global-header :user="currentUser"></global-header>
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import GlobalHeader from '@/components/layout/header.vue';

export default defineComponent({
	name: 'user-wrap',
	components: { GlobalHeader },
	props: {},
	setup() {
		const store = useStore();
		const currentUser = computed(() => store.state.user.userInfo);
		return { currentUser };
	},
});
</script>

<style lang="less">
.user-wrap {
	padding-top: 70px;
}
</style>
