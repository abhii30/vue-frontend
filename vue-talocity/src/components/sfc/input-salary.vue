<script setup>
import { defineProps } from 'vue'
import { RupeeIcon } from '@talocityui/icons'

defineProps({
  label: {
    type: String,
    default: ''
  },
  important: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number,
    default: null
  },
  max: {
    type: Number,
    default: null
  }
})
</script>

<template>
  <div class="flex flex-col font-Inter gap-1">
    <div class="text-sm font-medium leading-5">
      {{ label }}<span v-if="important" class="text-red-500"> *</span>
    </div>
    <div class="flex flex-row">
      <div class="flex relative">
        <input
          type="text"
          id="salaryMin"
          :value="min"
          @input="$emit('update:min', $event.target.value)"
          class="border rounded-lg px-9 h-9 text-sm focus:outline-1 focus:outline-talocity-blue-color"
        />
        <RupeeIcon class="absolute left-0 h-9 mx-4" />
      </div>
      <span class="leading-9 px-2 text-lg">-</span>
      <div class="flex relative">
        <input
          type="text"
          id="salaryMax"
          :value="max"
          @input="$emit('update:max', $event.target.value)"
          class="border rounded-lg px-9 h-9 w-full text-sm focus:outline-1 focus:outline-talocity-blue-color"
        />
        <Rupee class="absolute left-0 h-9 mx-4" />
      </div>
    </div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='text'] {
  -moz-appearance: textfield;
}
</style>
