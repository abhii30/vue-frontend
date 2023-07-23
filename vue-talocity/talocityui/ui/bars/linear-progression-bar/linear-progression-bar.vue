<script setup>
	import {computed} from 'vue'
	const props = defineProps({
		percent : {
			type: String,
			default: "0",
			required: true
		}
	});

	const percentString = computed(() => props.percent)
</script>

<template>
	<div class="progress-div flex justify-center min-w-full items-center">
		<div class="bar w-full mr-3">
			<v-progress-linear 
				:model-value="percent" 
				color="rgba(16, 204, 203, 1)"
				bg-color="rgba(0, 19, 37, 0.60)" 
				rounded
				style="height: 2px"
			></v-progress-linear>
		</div>
		<p class="percent text-primary-color font-normal text-[10px] leading-[18px]">{{ percentString }}%</p>
	</div>
</template>

<style scoped>

</style>