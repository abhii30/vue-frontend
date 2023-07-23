<script setup>
import { ref, computed, defineEmits } from 'vue'
import { colors } from '@talocityui/theme'
import { Clock } from '@talocityui/icons'
const selectedTime = ref('')
defineProps({
  timeUploaded: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  }
})
const formattedTime = computed(() => {
  if (!selectedTime.value) {
    return ''
  }
  const [hours, minutes] = selectedTime.value.split(':')
  let suffix = 'AM'
  let formattedHours = parseInt(hours)
  if (formattedHours >= 12) {
    formattedHours -= 12
    suffix = 'PM'
  }
  if (formattedHours === 0) {
    formattedHours = 12
  }
  return `${formattedHours}:${minutes} ${suffix}`
})
</script>

<template>
  <span class="datepicker-toggle">
    <Clock class="datepicker-toggle-button" :color="color"></Clock>
    <input
      type="time"
      class="datepicker-input"
      v-model="selectedTime"
      @input="$emit('update:timeUploaded', formattedTime)"
      :step="1800"
    />
  </span>
</template>

<style scoped>
.datepicker-toggle {
  display: inline-block;
  position: relative;
  width: 18px;
  height: 19px;
}
.datepicker-toggle-button {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;base64,...');
}
.datepicker-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  box-sizing: border-box;
}
.datepicker-input::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
</style>
