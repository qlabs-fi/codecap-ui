<template>
	<div
		class="min-w-16 font-ptmono"
		:class="{ 'hover:cursor-pointer': !noCopy }"
		@click="copyAddress(value)"
	>
		<p v-if="copied">Copied!</p>
		<p v-else-if="username">{{ username }}</p>
		<p v-else>{{ formatAddress(value) }}</p>
	</div>
</template>

<script setup lang="ts">
import { formatAddress } from "~/utils";

const props = defineProps({
	value: {
		type: String as () => string,
		required: false,
		default: null,
	},
	username: {
		type: String as () => string,
		required: false,
		default: null,
	},
	noCopy: {
		type: Boolean as () => boolean,
		required: false,
		default: false,
	},
});

// copy composable
const { copy, copied } = useClipboard({ source: props.value });

// trigger copy
const copyAddress = (value: string): void => {
	if (props.noCopy) return;
	copy(value);
};
</script>
