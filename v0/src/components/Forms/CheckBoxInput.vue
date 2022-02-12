<script setup lang="ts">
/**
 * constants
 */

/**
 * props
 */

const props = defineProps({
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
		type: Boolean,
		required: true,
	},
	type: {
		type: String,
		required: false,
		default: "checkbox",
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

const handleInput = (): void => {
	// emit input update (while removing leading zeros)
	emit("update:value", Boolean(!props.value));
};
</script>

<template>
	<div class="flex flex-col group rounded-lg p-2">
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
			<input
				type="checkbox"
				:checked="value ? true : undefined"
				@input="handleInput"
			/>
			<slot v-if="$slots.legend" name="legend" />
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
