<!--
 * @Author: Rock Chang
 * @Date: 2021-08-21 17:26:16
 * @LastEditTime: 2021-08-21 18:33:22
 * @Description: 
-->
<template>
	<div class="errpage-wrap">
		<global-header :user="currentUser"></global-header>
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import GlobalHeader from '@/components/layout/header.vue';

export default defineComponent({
	name: 'errpage-wrap',
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
.errpage-wrap {
	padding-top: 100px;
}
</style>
