<script setup lang="ts">
/**
 * props
 */

defineProps({
	padding: {
		type: Boolean as () => boolean,
		required: false,
		default: true,
	},
	opacity: {
		type: Boolean as () => boolean,
		required: false,
		default: true,
	},
});
</script>

<template>
	<div
		class="card wsc-default-color"
		:padding="String(padding)"
		:opacity="String(opacity)"
	>
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.card {
	@apply flex-grow;
	@apply block;
	@apply rounded-2xl;
	@apply bg-gray-900;
	@apply transition-all;
	@apply duration-300;
	@apply ease-in-out;
	@apply border-1 wsc-thin-borders;
	@apply backdrop-filter backdrop-blur-sm;

	&[padding="true"] {
		@apply p-4;
	}

	&[opacity="true"] {
		@apply bg-opacity-50;
		@apply border-opacity-0;
		&:hover {
			@apply bg-opacity-80;
			@apply border-opacity-50;
		}
	}

	&[opacity="false"] {
		@apply bg-opacity-80;
		@apply border-opacity-50;
	}
}
</style>
