<script setup lang="ts">
import { useAppStore } from "~/stores/app";
import { ILink } from "~/types/interfaces/link.interface";

/**
 * props
 */

const props = defineProps({
	path: {
		type: String as () => string,
		required: false,
		default: null,
	},
});

/**
 * helpers
 */

const route = useRoute();
const slots = useSlots();

/**
 * local state
 */

const app = useAppStore();
const link = computed((): undefined | ILink => {
	if (!props.path) return undefined;
	let menuPath = props.path;

	// if submenu, remove non menu part of path (<=> remove submenu part)
	if (slots.submenu)
		menuPath = menuPath.substring(0, getPosition(menuPath, "/", 3));
	// console.log("menuPath", menuPath);

	// find associated menu
	return Object.values(app.getLinks).find((link) => menuPath === link.value);
});

/**
 * methods
 */

function getPosition(str: string, subStr: string, nth: number) {
	return str.split(subStr, nth).join(subStr).length;
}
</script>

<template>
	<!-- page path -->
	<div
		class="block overflow-hidden my-2 md:my-4 lg:my-6 flex items-center wsc-default-color text-lg"
	>
		<!-- 1. home -->
		<router-link class="opacity-50 hover:opacity-100" to="/">
			<p class="wsc-default-color text-sm">bash-3.2$ ./root</p>
		</router-link>

		<div v-if="link" class="flex items-center">
			<!-- separator -->
			<span class="mx-2 wsc-default-color">></span>

			<!-- 2. menu -->
			<router-link
				:class="{
					'opacity-50 hover:opacity-100': Boolean($slots.submenu),
				}"
				:to="link?.value"
			>
				<p class="wsc-default-color">
					{{ link.value }}
				</p>
			</router-link>

			<div v-if="Boolean($slots.submenu)" class="flex items-center">
				<!-- separator -->
				<span class="mx-2 wsc-default-color">></span>

				<!-- 3. sub menu -->
				<router-link
					class="flex items-center wsc-default-color"
					:to="route.path"
				>
					<slot name="submenu" />
				</router-link>
			</div>
		</div>
	</div>
</template>
