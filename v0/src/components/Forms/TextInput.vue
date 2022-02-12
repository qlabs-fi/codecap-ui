<script setup lang="ts">
import { Icon } from "@iconify/vue";

/**
 * constants
 */

/**
 * props
 */

defineProps({
	label: {
		type: String,
		required: false,
		default: null,
	},
	description: {
		type: String,
		required: false,
		default: null,
	},
	placeholder: {
		type: String,
		required: false,
		default: null,
	},
	value: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: false,
		default: "input",
	},
	error: {
		type: String,
		required: false,
		default: null,
	},
});

/**
 * events
 */

const emit = defineEmits(["update:value"]);

/**
 * state
 */

// refs

/**
 * methods
 */

const handleInput = (e: Event & { target: HTMLInputElement }): void => {
	// see https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
	const input = e.target?.value;

	// emit input update
	emit("update:value", input);
};
</script>

<template>
	<div
		class="
			flex flex-col
			group
			rounded-lg
			hover:bg-gray-600 hover:bg-opacity-10
			p-2
		"
	>
		<div class="flex flex-col opacity-50 group-hover:opacity-100">
			<p v-if="label" class="text-sm py-1 font-bold">
				{{ label }}
			</p>

			<p v-if="description" class="text-xs mt-1 mb-2">
				{{ description }}
			</p>
		</div>

		<!-- input -->
		<div class="flex items-center">
			<component
				:is="type"
				:value="value"
				class="
					w-full
					text-left
					bg-transparent
					focus:outline-none
					overflow-x-scroll
					rounded-lg
					p-2
					pr-8
					wsc-thin-borders
					mb-1
					focus:border-blue-300
					border-opacity-50
					focus:border-opacity-100
					text-xs text-gray-300
					no-underline
				"
				:placeholder="placeholder"
				:type="type"
				@input="handleInput"
			/>
			<div class="flex justify-end gap-2 -ml-8">
				<!-- <p class="">Valid</p> -->
				<Icon
					v-if="error"
					icon="carbon:warning-hex"
					class="text-red-700"
				/>
				<Icon
					v-else-if="value"
					icon="carbon:checkmark"
					class="text-green-300"
				/>
			</div>
		</div>

		<!-- error -->
		<div v-if="error" class="h-6 p-1 text-xs w-full">
			<p class="text-red-700 font-bold">
				{{ error }}
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
