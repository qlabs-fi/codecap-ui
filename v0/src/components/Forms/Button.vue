<script setup lang="ts">
import { Icon } from "@iconify/vue";

/**
 * props
 */

const props = defineProps({
	text: {
		type: String,
		required: false,
		default: null,
	},
	icon: {
		type: String,
		required: false,
		default: null,
	},
	iconLeft: {
		type: Boolean,
		required: false,
		default: false,
	},
	uppercase: {
		type: Boolean,
		required: false,
		default: true,
	},
	disabled: {
		type: Boolean,
		required: false,
		default: false,
	},
	focus: {
		type: Boolean,
		required: false,
		default: false,
	},
});

/**
 * events
 */

const emit = defineEmits(["clicked"]);

/**
 * methods
 */

const click = (): void => {
	console.log({ props });
	if (props.disabled) return;
	emit("clicked");
};
</script>

<template>
	<button
		:disabled="disabled"
		class="btn"
		:class="{
			'opacity-100': focus,
			'opacity-100': !focus,
			'btn-disabled': disabled,
			'btn-enabled': !disabled,
		}"
		@click="click()"
	>
		<Icon v-if="icon && iconLeft" :icon="icon" class="icon" />
		<p v-if="text" class="text" :class="{ uppercase: uppercase }">
			{{ text }}
		</p>
		<Icon v-if="icon && !iconLeft" :icon="icon" class="icon" />
	</button>
</template>

<style lang="scss" scoped>
.btn {
	@apply h-min;
	@apply flex justify-center items-center gap-2;
	@apply wsc-btn-padding rounded-lg border-1;
	@apply text-xs font-bold;
	@apply transition-all duration-300 ease-in-out;
	@apply text-gray-500;

	.text {
		@apply flex-grow truncate;
	}

	.icon {
		@apply min-h-4 min-w-4;
	}

	&-disabled {
		@apply border-gray-600;
		@apply cursor-not-allowed;
	}

	&-enabled {
		@apply border-blue-400;

		.text {
			@apply wsc-gradient-r-text;
		}

		.icon {
			@apply text-blue-400;
		}

		&:hover {
			@apply wsc-gradient-r-bg;
			@apply opacity-100;

			.text {
				@apply text-gray-200;
			}

			.icon {
				@apply text-white;
			}
		}
	}
}
</style>
