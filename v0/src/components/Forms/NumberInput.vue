<script setup lang="ts">
import { Icon } from "@iconify/vue";

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
		type: Number,
		required: true,
	},
	type: {
		type: String,
		required: false,
		default: "number",
	},
	min: {
		type: Number,
		required: false,
		default: 0,
	},
	max: {
		type: Number,
		required: false,
		default: 0,
	},
	base: {
		type: Boolean,
		required: false,
		default: false,
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
const timeout = ref<null | NodeJS.Timeout>(null);
const localValue = ref(props.value);
const localError = ref<string>("");
const isValidatingInput = ref<boolean>(false);

// watchers

/**
 * methods
 */

const handleInput = (e: Event): void => {
	// see https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
	const input = Number(
		(e as Event & { target: HTMLInputElement }).target?.value,
	);

	// set state
	localValue.value = input;
	localError.value = "";
	isValidatingInput.value = true;

	// if a timeout is still in process, clear it before reassigning a new one
	if (timeout.value) clearTimeout(timeout.value);

	// set new timeout
	timeout.value = setTimeout(async (): Promise<void> => {
		// handle NaN
		if (isNaN(input)) localError.value = "A positive number is required";
		// handle min with props.base
		else if (props.base && input / 100 < props.min)
			localError.value = `Minimum base point is ${props.min * 100}`;
		// handle max with props.base
		else if (props.base && props.max && input / 100 > props.max)
			localError.value = `Maximum base point is ${props.max * 100}`;
		// handle min without props.base
		else if (!props.base && input < props.min)
			localError.value = `Minimum number is ${props.min}`;
		// handle max without props.base
		else if (!props.base && props.max && input < props.max)
			localError.value = `Maximum number is ${props.max}`;
		// emit input update
		else emit("update:value", localValue.value);

		// set state
		isValidatingInput.value = false;
	}, 600);

	// emit input update (while removing leading zeros)
	emit("update:value", Number(input));
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

		<!--
		<pre>{{ min }}</pre>
		<pre>{{ localValue }}</pre>
		<pre>{{ max }}</pre> -->

		<!-- input -->
		<div class="flex items-center">
			<input
				:value="localValue"
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
				:min="0"
				@input="handleInput"
			/>
			<div class="flex justify-end gap-2 -ml-8">
				<Icon
					v-show="isValidatingInput"
					icon="carbon:hourglass"
					class="text-blue-300"
				/>
				<Icon
					v-show="!isValidatingInput && (localError || error)"
					icon="carbon:warning-hex"
					class="text-red-700"
				/>
				<Icon
					v-show="!isValidatingInput && !(localError || error)"
					icon="carbon:checkmark"
					class="text-green-300"
				/>
			</div>
		</div>

		<!-- error -->
		<div v-if="localError || error" class="h-6 p-1 text-xs w-full">
			<p class="text-red-700 font-bold">
				<span v-if="localError">
					{{ localError }}
				</span>
				<span v-else>
					{{ error }}
				</span>
			</p>
		</div>

		<!-- base -->
		<div
			v-else-if="base && typeof localValue === 'number'"
			class="h-6 p-1 text-xs opacity-50 group-hover:opacity-100"
		>
			<p class="">
				Equivalent to: {{ parseFloat(String(value / 100)).toFixed(2) }}%
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
