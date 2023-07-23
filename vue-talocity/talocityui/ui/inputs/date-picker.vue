<script setup>
import { ref, computed, defineEmits } from 'vue'
import { Calendar } from '@talocityui/icons'
const selectedDate = ref('')
defineProps({
  dateUploaded: {
    type: String,
    default: ''
  },
  min:{
    type: String,
  }
})

const formattedDate = computed(() => {
  if (!selectedDate.value) {
    return ''
  }
  const date = new Date(selectedDate.value)
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  const [month, day, year] = date.toLocaleDateString('en-US', options).split(' ')
  return `${day.replace(',', '')} ${month}, ${year}`
})
</script>

<template>
  <span class="datepicker-toggle">
    <Calendar class="datepicker-toggle-button"></Calendar>
    <input
      type="date"
      class="datepicker-input"
      v-model="selectedDate"
      @input="$emit('update:dateUploaded', formattedDate)"
      :min="min"
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