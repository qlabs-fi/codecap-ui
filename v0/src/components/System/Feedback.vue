<script setup lang="ts">
import { FeedbackFish } from "@feedback-fish/vue";
</script>

<template>
	<!-- Get your projectId from your dashboard at feedback.fish/app -->
	<FeedbackFish project-id="1638e0e1d2696d" />

	<!-- Optional: associate feedback with the current user's email -->
	<button data-feedback-fish data-feedback-fish-userid="test">
		Send feedback
	</button>
</template>
