<script setup lang="ts">
import { useToasts } from "~/composables";
import { Icon } from "@iconify/vue";

const { showAllToasts, toasts } = useToasts();
</script>

<template>
	<footer
		class="bg-transparent pt-5 px-5 flex justify-around items-center backdrop-filter backdrop-blur-sm text-xs"
	>
		<div
			class="flex items-center rounded-t-lg px-4 py-2 gap-1.5 font-bold text-sm text-gray-800"
		>
			<a
				href="https://twitter.com/fran6brg"
				rel="nofollow noopener"
				target="_blank"
			>
				<p class="">@fran6brg</p>
			</a>
			<Icon icon="uil:twitter" class="w-4 h-4" />
			<a
				href="https://mobile.twitter.com/Mersona5"
				rel="nofollow noopener"
				target="_blank"
			>
				<p class="">@Mersona5</p>
			</a>
		</div>

		<button
			v-if="toasts.length"
			class="focus:outline-none ml-3 h-8 px-2 text-gray-500 flex items-center gap-x-2"
			@click="showAllToasts = !showAllToasts"
		>
			<Icon v-if="showAllToasts" icon="carbon:view-off" class="h-3 w-3" />
			<Icon v-else icon="carbon:view" class="h-3 w-3" />
			<p>notifications</p>
		</button>
	</footer>
	<!-- <Feedback /> -->
</template>
