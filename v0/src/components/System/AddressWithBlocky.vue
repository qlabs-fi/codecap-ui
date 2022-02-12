<script setup lang="ts">
/**
 * props
 */

defineProps({
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
</script>

<template>
	<a
		:href="`https://bscscan.com/token/${value}`"
		target="_blank"
		rel="noopener"
		class="flex gap-2 bg-gray-600 bg-opacity-50 py-1 px-2 rounded-md"
	>
		<Address
			:value="value"
			:username="username"
			:no-copy="noCopy"
			class=""
		/>
		<Blockie :seed="value" />
	</a>
</template>
