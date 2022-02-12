<script setup lang="ts">
import { Icon } from "@iconify/vue";
// see https://vueuse.org/guide/components.html
import { OnClickOutside } from "@vueuse/components";
import { ILink } from "~/types/interfaces/link.interface";
import { useAppStore } from "~/stores/app";
import { ELinkNames } from "~/types/enums/link.enum";

/**
 * constants
 */

const app = useAppStore();
const sections: ILink[][] = [
	[
		app.getLinks[ELinkNames.LIST],
		app.getLinks[ELinkNames.CONTRIBUTORS],
		app.getLinks[ELinkNames.ABOUT],
	],
	[app.getLinks[ELinkNames.TWITTER]],
];

/**
 * state
 */

// imports
const route = useRoute();
const router = useRouter();

// refs
const listIsOpen = ref(false);

/**
 * methods
 */

const selectComponent = (link: ILink) => {
	if (link.modal) return "button";
	else if (link.internal) return "router-link";
	else if (link.external) return "a";
	return "div";
};
const selectAttributes = (link: ILink) => {
	if (link.modal) return {};
	else if (link.internal)
		return {
			to: link.value,
		};
	else if (link.external)
		return {
			target: "_blank",
			href: link.value,
			rel: "nofollow noopener",
		};
	return "div";
};
const linkMatchRoute = (link: string) => route.path.startsWith(link);
const goToLinkOrPopModal = (link: ILink) => {
	// pop modal
	if (link.modal) link.active = true;
	else if (link.internal) {
		// go to link
		router.push(link.value);
		// close list
		listIsOpen.value = !listIsOpen.value;
	}
};
</script>

<template>
	<OnClickOutside @trigger="listIsOpen = false">
		<div class="relative">
			<!-- icon -->
			<button
				class="flex items-center wsc-btn-padding wsc-thin-borders border-opacity-20 hover:wsc-border-from outline-none wsc-transition-all"
				:class="{
					'wsc-border-from border-opacity-100': listIsOpen,
				}"
				@click="listIsOpen = !listIsOpen"
				@keydown.esc="listIsOpen = false"
			>
				<Icon
					:icon="
						listIsOpen
							? 'carbon:close'
							: 'carbon:overflow-menu-horizontal'
					"
					class="h-5 w-4"
					:class="{ 'wsc-text-from': listIsOpen }"
				/>
			</button>

			<!-- popup -->
			<transition name="fade">
				<div
					v-show="listIsOpen"
					class="absolute z-10 w-max top-12 right-0 wsc-thin-borders wsc-border-from border-opacity-20 hover:border-opacity-100 backdrop-filter backdrop-blur-md py-4 px-8 wsc-transition-all"
				>
					<!-- popup title -->
					<h1 class="opacity-50 mb-4 text-center tracking-widest">
						codecap
					</h1>

					<!-- content -->
					<ul
						v-for="(section, sIndex) in sections"
						:key="sIndex"
						class="first:border-none border-t-1 border-gray-600 border-opacity-20 py-2 first:pt-0 last:pb-0"
					>
						<!-- section links -->
						<li
							v-for="link in section"
							:key="link.value"
							class="py-1.5 hover:pl-2 w-50 transition-all duration-200 ease-in-out cursor-pointer"
							:class="{
								'opacity-50 hover:opacity-100': !linkMatchRoute(
									link.value,
								),
							}"
						>
							<component
								:is="selectComponent(link)"
								class="flex justify-start items-center"
								v-bind="selectAttributes(link)"
								@click="goToLinkOrPopModal(link)"
							>
								<Icon
									:icon="link.icon"
									class="w-4 h-4"
									:class="{
										'wsc-text-from':
											(link.modal && link.active) ||
											(!link.modal &&
												linkMatchRoute(link.value)),
									}"
								/>
								<span
									class="ml-3"
									:class="{
										'wsc-gradient-r-text font-bold':
											(link.modal && link.active) ||
											(!link.modal &&
												linkMatchRoute(link.value)),
									}"
								>
									{{ link.name }}
								</span>
							</component>
						</li>
					</ul>
				</div>
			</transition>
		</div>
	</OnClickOutside>
</template>
