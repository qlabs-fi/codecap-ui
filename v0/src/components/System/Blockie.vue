<template>
	<img :src="blockie" class="rounded-full" />
</template>

<script lang="ts" setup>
import * as blockies from "blockies-ts";

/**
 * props
 */

// see https://github.com/HerrBertling/vue-blockies/blob/main/src/components/VueBlockie.vue
const props = defineProps({
	/**
	 * Seed used to generate icon data, default: random
	 */
	seed: {
		type: String,
		required: false,
		default: "randomString",
	},
	/**
	 * To manually specify the icon color, default: random
	 */
	color: {
		type: String,
		required: false,
		default: "#76a1d1",
	},
	/**
	 * Choose a different background color, default: random
	 */
	bgcolor: {
		type: String,
		required: false,
		default: "#35495E",
	},
	size: {
		type: String as () => string,
		required: false,
		default: "sm",
	},
	scale: {
		type: String as () => string,
		required: false,
		default: "sm",
	},
	/**
	 * Each pixel has a 13% chance of being of a third color,
	 * default: random. Set to -1 to disable it. These "spots" create structures
	 * that look like eyes, mouths and noses.
	 */
	spotColor: {
		type: String,
		required: false,
		default: "#3bc9a7",
	},
});

/**
 * constants
 */

// Width/height of the icon in blocks, default: 8
const sizes: Record<string, number> = {
	sm: 8,
	md: 11,
	lg: 13,
};

// Width/height of each block in pixels, default: 4
const scales: Record<string, number> = {
	sm: 2,
	md: 3,
	lg: 4,
};

/**
 * state
 */

const blockie = computed(() => {
	const canvas = blockies.create({
		seed: props.seed,
		color: props.color,
		bgcolor: props.bgcolor,
		size: sizes[props.size],
		scale: scales[props.scale],
		spotcolor: props.spotColor,
	});
	return canvas.toDataURL();
});
</script>
