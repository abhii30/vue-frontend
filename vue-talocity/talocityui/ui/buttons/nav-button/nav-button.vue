<script setup>
import {colors, helpers} from '@talocityui/theme'
import {computed} from 'vue';
const props = defineProps({
	value: {
		type: String,
		default: "value"
	},
	active:{
		type: String,
		default: "",
	},
	color:{
		type: String,
		default: colors["talocity-blue-color"],
	}
})

const backgroundColor = computed(()=>helpers.fadeColor(props.color,'0.08'))
</script>
<template>
	<button 
		:class="[
			active === value ?
			'font-medium' :
			'font-normal text-base-color',
			'font-Inter px-3 py-1.5 rounded text-sm'
		]"
		:style="(active === value) && {
			color: color,
            backgroundColor: backgroundColor
		}"
	>
		{{value}}
	</button>
</template>
<style>
	
</style>