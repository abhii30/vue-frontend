<script setup>
defineProps({
	value: {
		type: String,
		default: "value"
	},
	action: {
		type: Function,
		default: () => {
			return;
		}
	},
	textColorClass: {
		type: String,
		default: "secondary-color"
	},
	icon:{
		type:Boolean,
		default:false
	}
})

</script>
<template lang="">
	<button @click="$emit('action')" :class="[`secondary-button flex items-center gap-2 justify-center border-outline-color border py-2.5 font-sans font-semibold text-sm rounded-lg cursor-pointer`,`text-${textColorClass}`,icon?'px-4':'px-[22px]']"
	>
		<slot name="icon"></slot>
		{{value}}
	</button>
</template>
<style>
	
</style>