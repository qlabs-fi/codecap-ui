<script setup lang="ts">
import { useAppStore } from "~/stores/app";
import { Icon } from "@iconify/vue";

const app = useAppStore();
const route = useRoute();
const linkMatchRoute = (link: string) => route.path.startsWith(link);
</script>

<template>
	<div class="text-sm flex items-center">
		<!-- routes container -->
		<ul class="flex items-center h-full w-full justify-evenly gap-2">
			<!-- route -->
			<li
				v-for="link in Object.values(app.getLinks).filter(
					(link) => link.isPartOfTopLeftMenu,
				)"
				:key="link.value"
				class="link bg-gray-900 hover:bg-opacity-20"
				:class="{
					'bg-opacity-30': linkMatchRoute(link.value),
					'bg-opacity-0': !linkMatchRoute(link.value),
				}"
			>
				<!-- link -->
				<router-link
					class="flex items-center wsc-default-color p-2 lg:px-4"
					:to="link.value"
				>
					<!-- link icon -->
					<Icon
						:icon="link.icon"
						class="w-5 h-5"
						:class="{
							'wsc-text-from': linkMatchRoute(link.value),
							'opacity-30': !linkMatchRoute(link.value),
						}"
					/>

					<!-- link content -->
					<span
						class="ml-3 capitalize <md:hidden"
						:class="{
							'wsc-gradient-r-text': linkMatchRoute(link.value),
							'opacity-30': !linkMatchRoute(link.value),
						}"
						>{{ link.name }}</span
					>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.link {
	@apply rounded-lg;
	@apply transition-all;
	@apply duration-100;
	@apply ease-in-out;
	@apply font-bold;
}
</style>
