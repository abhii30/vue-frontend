<script setup>
import { computed } from 'vue'
import { RightIcon, LeftIcon } from '@talocityui/icons'

const props = defineProps({
  currentPage: {
    type: Number,
    default: null
  },
  totalPages: {
    type: Number,
    default: null
  },
  prevPage: {
    type: Function,
    default: () => {
      return
    }
  },
  nextPage: {
    type: Function,
    default: () => {
      return
    }
  }
})
const isFirstPage = computed(() => {
  return props.currentPage === 1
})
const isLastPage = computed(() => {
  return props.currentPage === props.totalPages
})
</script>

<template>
  <div class="flex flex-row gap-3">
    <button class="border h-10 w-10 rounded-lg" @click="$emit('prev-page')" :disabled="isFirstPage">
      <LeftIcon class="w-full" :class="isFirstPage ? 'opacity-50 cursor-not-allowed' : ''" />
    </button>
    <button class="border h-10 w-10 rounded-lg" @click="$emit('next-page')" :disabled="isLastPage">
      <RightIcon class="w-full" :class="isLastPage ? 'opacity-50 cursor-not-allowed' : ''" />
    </button>
  </div>
</template>

<style scoped>
</style>
