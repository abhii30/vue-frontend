<script setup>
	import {colors} from '@talocityui/theme'
	defineProps({
		value: {
			type:String,
			default:"value"
		},
		isActive: {
			type:Boolean,
			default:false
		},
		action: {
			type: Function,
			default: () => {
				return;
			}
		},
		color:{
			type:String,
			default:colors['talocity-blue-color']
		}
	})
</script>

<template>
	<div 
		@click="$emit('action')" 
		:class="[
			`text-center tab-button font-Inter text-sm px-1 py-2`,
			isActive?`active border-b-2`:`border-b`]"
		:style="{
			color:isActive?color:`#586470`,
			borderBottomColor:isActive?color:`#586470`,
		}"	
		>
		{{ value }}
	</div >
</template>

<style scoped>
</style>