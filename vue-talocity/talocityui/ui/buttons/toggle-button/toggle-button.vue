<script setup>
import { ref, computed } from 'vue'
import { colors, helpers } from '@talocityui/theme'

const props = defineProps({
  value: {
    type: String,
    default: 'value'
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  },
  isActive: {
    type: Boolean,
    default: true
  }
})
const isActive = ref(props.isActive)
const backgroundColor = computed(() => helpers.fadeColor(props.color, '0.08'))
</script>

<template>
  <button
    type="button"
    class="font-Inter text-sm font-normal outline outline-1 py-1.5 px-3 rounded-[36px]"
    :style="{
      backgroundColor: isActive ? backgroundColor : 'transparent',
      color: isActive ? color : colors['secondary-color'],
      borderColor: isActive ? color : colors['primary-color-dark']
    }"
    @click="$emit('update:isActive', (isActive = !isActive))"
  >
    {{ value }}
  </button>
</template>