<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
	title: "codecap",
	meta: [
		{
			name: "codecap",
			content: "codecap",
		},
	],
});
</script>

<template>
	<router-view />
	<div id="modal" />
	<ToastList />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=PT+Mono&display=swap");
</style>
