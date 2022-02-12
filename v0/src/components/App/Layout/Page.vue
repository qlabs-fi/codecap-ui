<route lang="yaml">
meta:
    layout: default
</route>

<script setup lang="ts">
/**
 * props
 */

defineProps({
	paddingRight: {
		type: Boolean as () => boolean,
		required: false,
		default: true,
	},
});

const debug = Boolean(Number(import.meta.env.VITE_DEBUG));
</script>

<template>
	<!-- page -->
	<div
		class="page"
		:class="{ 'pr-4': paddingRight, 'border-1 border-red-500': debug }"
	>
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.page {
	@apply pl-4;
	@apply w-full h-full;
	@apply sm:max-w-9/10;
	@apply md:max-w-8/10;
	@apply 2xl:max-w-7/10;
	@apply mx-auto;
	@apply overflow-y-hidden;
	@apply overflow-x-hidden;
	@apply wsc-default-color;
}
</style>
