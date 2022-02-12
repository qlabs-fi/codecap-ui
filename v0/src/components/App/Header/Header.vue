<script setup lang="ts"></script>

<template>
	<div
		class="flex items-center justify-between px-6 pt-3 py-3 sm:py-6 bg-transparent transition-opacity duration-300 ease-in-out backdrop-filter"
	>
		<div class="flex items-center">
			<router-link to="/" class="mr-10">
				<p class="wsc-gradient-l-text tracking-widest">codecap</p>
			</router-link>
			<Menu class="<sm:hidden" />
		</div>

		<div class="flex justify-end items-center">
			<MoreDropdown />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.thin-borders {
	@apply py-1;
	@apply px-4;
	@apply rounded-lg;
}
</style>
