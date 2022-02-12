<script lang="ts" setup>
import { useToasts } from "~/composables";
import { Icon } from "@iconify/vue";
import { IToast } from "~/types/interfaces/toast.interface";
import { EToastStatus } from "~/types/enums/toast.enum";

/**
 * state
 */

// array of notifications object
const { showAllToasts, toasts } = useToasts();

// display time in ms
const duration = 10000;

// refs
let now = ref(Date.now());

const toastsSorted = computed(() =>
	toasts.value
		.filter((toast: IToast) => toastShouldBeDisplayed(toast))
		.reverse(),
);

/**
 * methods
 */

setInterval(() => (now.value = Date.now()), 1000);

const toastShouldBeDisplayed = (toast: IToast): boolean =>
	(showAllToasts.value && toast.status === EToastStatus.SUCCESS) ||
	(now.value < toast.timestamp + duration && !toast.hide);
</script>

<template>
	<!-- list container -->
	<transition-group
		class="fixed right-0 pr-5 top-20 z-10 flex flex-col items-end max-h-100 overflow-y-scroll overflow-x-visible"
		name="list"
		tag="div"
	>
		<!-- list -->
		<div v-for="(toast, key) in toastsSorted" :key="key" class="my-2">
			<!-- notification container -->
			<div
				class="rounded-lg wsc-default-color bg-gray-900 bg-opacity-50 py-2 px-4 mt-2 first:mt-0 max-w-max shadow-xs border-2 border-opacity-50 overflow-x-visible backdrop-filter backdrop-blur-sm"
				:class="{
					'shadow-green-500 border-green-500':
						toast.status === EToastStatus.SUCCESS,
					'wsc-thin-borders': toast.status === EToastStatus.WAITING,
					'shadow-red-500 border-red-500':
						toast.status === EToastStatus.FAIL,
				}"
			>
				<div
					class="flex items-center justify-between gap-x-6 rounded-lg"
				>
					<!-- status icon -->
					<Icon
						:icon="toast.icon"
						class="h-5 w-5"
						:class="{
							'text-green-500':
								toast.status === EToastStatus.SUCCESS,
							'text-red-500': toast.status === EToastStatus.FAIL,
						}"
					/>

					<!-- content -->
					<p class="flew-grow text-xs font-light">
						{{ toast.payload.message }}
					</p>

					<!-- actions -->
					<div class="flex gap-x-2">
						<!-- link to bscscan -->
						<a
							v-if="toast.payload.txHash"
							:href="`https://bscscan.com/token/${toast.payload.txHash}`"
							target="_blank"
							rel="noopener"
							class="rounded-full border-1 border-gray-500 border-opacity-30 p-1"
						>
							<Icon
								icon="ic:baseline-open-in-new"
								class="h-3 w-3"
							/>
						</a>

						<!-- close -->
						<button
							class="rounded-full border-1 border-gray-500 border-opacity-30 p-1"
							@click="toast.hide = true"
						>
							<Icon icon="carbon:close" class="h-3 w-3" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</transition-group>
</template>

<style lang="scss" scoped>
.list-enter-to {
	opacity: 100;
}

.list-leave-to {
	opacity: 0;
	transform: translateX(50px);
}

.list-enter-active,
.list-leave-active {
	transition: all 0.5s;
}
</style>
