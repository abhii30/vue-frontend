<script setup>
	import {LeftIcon} from '@talocityui/icons'
	defineProps({
		active:{
			type: Boolean,
			default: false,
		}
	})
</script>
<template>
	<button class="border h-10 w-10 rounded-lg" :disabled="!active">
      <LeftIcon class="w-full" :class="!active ? 'opacity-50 cursor-not-allowed' : ''" />
    </button>
</template>