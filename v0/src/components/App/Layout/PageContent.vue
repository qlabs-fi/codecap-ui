<script setup lang="ts">
defineProps({
	needConnectedWallet: {
		type: Boolean,
		required: false,
		default: false,
	},
});
</script>

<template>
	<!-- page content -->
	<div class="content">
		<div
			v-if="false"
			class="mt-10 flex flex-col justify-center items-center gap-4"
		>
			<p class="wsc-default-color">Content restricted</p>
		</div>
		<slot v-else />
	</div>
</template>

<style lang="scss" scoped>
.content {
	@apply mx-auto;
	@apply h-full;
	@apply overflow-y-scroll;
	@apply overflow-x-visible;
	@apply wsc-default-color;
	@apply pb-20;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
	display: none;
}
</style>
