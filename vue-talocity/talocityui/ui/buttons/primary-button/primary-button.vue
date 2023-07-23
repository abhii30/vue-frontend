<script setup>
import {colors} from '@talocityui/theme'
defineProps({
	value: {
		type: String,
		default: "value"
	},
	bgColor: {
		type: String,
		default: colors["talocity-blue-color"]
	},
	textColor: {
		type: String,
		default: "white"
	},
	action: {
		type: Function,
		default: () => {
			return;
		}
	},
	type:{
		type: String,
		default: "button"
	},
	icon:{
		type:Boolean,
		default:false
	}
})

</script>
<template>
	<button @click="$emit('action')" :type="type" :class="['flex items-center justify-center gap-2 primary-button py-2.5 font-sans font-semibold text-sm rounded-lg cursor-pointer text-primary-color-dark',icon?'px-4':'px-[22px]']"
		:style="{
			backgroundColor: bgColor,
            color: textColor,
		}"
	>
	<slot name="icon"></slot>
		{{value}}
	</button>
</template>
<style>
	
</style>