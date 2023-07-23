<script setup>
 	import NoFunnelImage from "@/assets/no-funnel-image.vue"
</script>
<template>
	<div class="flex flex-col min-h-full mt-16 items-center w-full">
		<div class="no-jobs flex justify-center flex-col items-center">
			<NoFunnelImage />
			<h1 class="mt-8 font-Inter font-semibold text-xl">
				No Applicants yet!
			</h1>
			<p class="text-center mt-2">
				Looks like you haven’t posted a job.
			</p>
			<button class="mt-5 text-sm font-Inter text-white font-semibold bg-talocity-blue-color w-full px-1 py-2.5 rounded-lg">
				Post a Job
			</button>
		</div>	
	</div>
</template>