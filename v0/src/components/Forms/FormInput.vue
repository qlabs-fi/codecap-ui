<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps({
	reactiveKey: {
		type: String,
		required: false,
		default: "",
	},
	modelValue: {
		type: [String, Number],
		required: false,
		default: "",
	},
	placeholder: {
		type: String as () => string,
		required: false,
		default: "",
	},
	error: {
		type: [String, Boolean],
		required: false,
		default: false,
	},
	number: {
		type: Boolean as () => boolean,
		required: false,
		default: false,
	},
	disabled: {
		type: Boolean as () => boolean,
		required: false,
		default: false,
	},
	maxlength: {
		type: [String, Number],
		required: false,
		default: 0,
	},
	required: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event): void => {
	if (!event.target) return;
	const target = event.target as EventTarget & { value: string };
	const value = String(target.value);
	console.log("");
	console.log("handleInput", { value });
	console.log("props.number", props.number);
	if (props.number) {
		return emit("update:modelValue", {
			value: !value ? undefined : parseFloat(value),
			key: props.reactiveKey,
		});
	}
	emit("update:modelValue", { value, key: props.reactiveKey });
};
</script>

<template>
	<div class="wsc-default-color">
		<!-- label -->
		<div class="whitespace-nowrap">
			<slot name="label" />
		</div>

		<!-- 1) select -->
		<div
			v-if="$slots.selected"
			class="flex-auto whitespace-nowrap overflow-x-auto"
		>
			<slot name="selected" />
		</div>

		<!-- 2) input -->
		<!-- :maxlength="maxlength" -->
		<input
			v-else
			:value="modelValue"
			:placeholder="placeholder"
			:type="number ? 'number' : 'text'"
			class="
				focus:outline-none
				w-full
				bg-transparent
				border-1
				px-2
				py-1
				rounded-lg
			"
			:required="required"
			:disabled="disabled"
			@input="handleInput"
		/>

		<!-- info -->
		<slot name="info" />

		<!-- error -->
		<span v-if="error" class="">
			<Icon icon="carbon:warning" class="" />
		</span>
	</div>
</template>
