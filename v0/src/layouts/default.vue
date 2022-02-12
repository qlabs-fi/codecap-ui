<script setup lang="ts">
import { ELoaders } from "~/types/enums/loader.enum";
import { useApp } from "~/composables";
const { initialized } = useApp();
</script>

<template>
	<main
		class="w-full h-screen flex flex-col overflow-y-auto overflow-x-hidden absolute inset-0 relative"
	>
		<Header />
		<div
			v-if="initialized"
			class="transition-all duration-300 ease-in-out min-w-xs overflow-y-auto overflow-x-visible w-full h-full"
		>
			<router-view />
		</div>
		<div
			v-else
			class="absolute inset-0 h-full flex flex-col justify-center items-center gap-4"
		>
			<Spinner :loader="ELoaders.bounce" size="lg" />
			<p class="wsc-default-color">some loading placeholder</p>
		</div>
		<Footer class="fixed bottom-0 w-full" />
	</main>
</template>
