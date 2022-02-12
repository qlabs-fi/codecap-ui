<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ethers } from "ethers";

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
const timeout = ref<null | NodeJS.Timeout>(null);
const localValue = ref(props.value);
const localError = ref<string>("");
const isValidatingInput = ref<boolean>(false);

/**
 * methods
 */

const handleInput = (e: Event & { target: HTMLInputElement }): void => {
	// see https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
	const input = e.target?.value;

	// set state
	localValue.value = input;
	localError.value = "";
	isValidatingInput.value = true;

	// if a timeout is still in process, clear it before reassigning a new one
	if (timeout.value) clearTimeout(timeout.value);

	// set new timeout
	timeout.value = setTimeout(async (): Promise<void> => {
		// handle empty string
		if (!input) localError.value = "A valid address is required";
		// handle NullAddress
		else if (
			input.toLowerCase() === "0x0000000000000000000000000000000000000000"
		)
			localError.value = "Null address";
		// handle ETH address
		else if (!ethers.utils.isAddress(input.toLowerCase()))
			localError.value = "Please enter a valid address";

		// emit input update
		emit("update:value", localValue.value);

		// set state
		isValidatingInput.value = false;
	}, 600);
};
</script>

<template>
	<div
		class="flex flex-col group rounded-lg hover:bg-gray-600 hover:bg-opacity-10 p-2"
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
		<!-- see https://www.tutorialrepublic.com/faq/how-to-disable-spell-checking-in-html-forms.php -->
		<div class="flex items-center">
			<component
				:is="type"
				:value="localValue"
				class="w-full text-left bg-transparent focus:outline-none overflow-x-scroll rounded-lg p-2 pr-8 wsc-thin-borders mb-1 focus:border-blue-300 border-opacity-50 focus:border-opacity-100 text-xs text-gray-300 no-underline"
				spellcheck="false"
				:placeholder="placeholder"
				:type="type"
				@input="handleInput"
			/>
			<div class="flex justify-end gap-2 -ml-8">
				<Icon
					v-if="localError || error"
					icon="carbon:warning-hex"
					class="text-red-700"
				/>
				<Icon
					v-else-if="isValidatingInput"
					icon="carbon:hourglass"
					class="text-blue-300"
				/>
				<Icon
					v-else-if="localValue"
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
	</div>
</template>

<style lang="scss" scoped></style>
