<script setup>
import { colors } from '@talocityui/theme'
defineProps({
  color:{
    type:String,
    default:colors['talocity-blue-color']
  }
})
</script>

<template>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.33301 12.6667V8.66671H3.33301V7.33337H7.33301V3.33337H8.66634V7.33337H12.6663V8.66671H8.66634V12.6667H7.33301Z"
      :fill="color"
    />
  </svg>
</template>