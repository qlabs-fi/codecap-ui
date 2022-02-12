<script setup lang="ts">
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";
import { ELoaders } from "~/types/enums/loader.enum";

/**
 * props
 */

const props = defineProps({
	loader: {
		type: String as () => string,
		required: false,
		default: "pulse",
	},
	loading: {
		type: Boolean as () => boolean,
		required: false,
		default: true,
	},
	size: {
		type: String as () => string,
		required: false,
		default: "sm",
	},
});

/**
 * constants
 */

const loaders: Record<string, string> = {
	pulse: ELoaders.pulse,
	bounce: ELoaders.bounce,
};

const sizes: Record<string, string> = {
	sm: "8px",
	md: "32px",
	lg: "64px",
};
</script>

<template>
	<pulse-loader
		v-if="loaders[loader] === ELoaders.pulse"
		:loading="loading"
		color="#4b86c4"
		:size="sizes[props.size]"
	/>
	<bounce-loader
		v-else-if="loaders[loader] === ELoaders.bounce"
		:loading="loading"
		color="#467db9"
		:size="sizes[props.size]"
	/>
</template>
