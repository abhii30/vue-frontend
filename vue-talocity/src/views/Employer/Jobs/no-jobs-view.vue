<script setup>
 	import NoJobsImage from "@/assets/no-jobs-image.vue"
</script>
<template>
	<div class="flex flex-col min-h-full mt-16 items-center w-full">
		<div class="no-jobs flex justify-center flex-col items-center">
			<NoJobsImage/>
			<h1 class="mt-8 font-Inter font-semibold text-xl">
				No drafts created - yet!
			</h1>
			<p class="text-center mt-2">
				Looks like you haven't drafted any <br/>job posts.
			</p>
			<button class="mt-5 text-sm font-Inter text-white font-semibold bg-talocity-blue-color w-full px-1 py-2.5 rounded-lg">
				Create a Job Post
			</button>
		</div>	
	</div>
</template>