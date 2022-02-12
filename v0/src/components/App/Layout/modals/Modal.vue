<script setup lang="ts">
/**
 * props
 */

const props = defineProps({
	open: {
		type: Boolean,
		required: true,
	},
	blur: {
		type: Boolean,
		required: false,
		default: true,
	},
});

/**
 * events
 */

defineEmits(["close"]);

/**
 * state
 */

const { open } = toRefs(props);
</script>

<template>
	<transition name="fade">
		<div
			v-if="open"
			class="fixed flex inset-0 justify-center items-center mx-auto z-10"
			:class="{ 'backdrop-filter backdrop-blur-sm': blur }"
		>
			<!-- overlay -->
			<div
				class="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 hover:cursor-pointer"
				@click="$emit('close')"
			/>

			<!-- container -->
			<Card
				:padding="false"
				:opacity="false"
				class="max-w-screen sm:max-w-120 overflow-y-auto overflow-x-hidden flex flex-col relative rounded-lg z-20 mx-2"
				style="max-height: calc(100vh - 100px)"
			>
				<!-- header -->
				<div v-if="$slots.header" class="pt-3 px-3 text-center">
					<slot name="header" />
				</div>

				<!-- content -->
				<div
					class="h-full sm:max-h-md flex-auto overflow-y-auto overflow-x-auto"
				>
					<slot />
				</div>

				<!-- footer -->
				<div v-if="$slots.footer" class="px-3 pb-3 text-center">
					<slot name="footer" />
					<!-- <slot name="error" /> -->
				</div>
			</Card>
		</div>
	</transition>
</template>
