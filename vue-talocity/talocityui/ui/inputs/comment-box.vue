<script setup>
import { DeleteIcon, EditIcon } from '@talocityui/icons'
import Profile from '../../../src/assets/Ellipse.png'
defineProps({
  comment: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="flex flex-col gap-2 font-Inter my-4">
    <div class="flex flex-row items-center justify-between">
      <div class="flex items-center flex-row gap-3">
        <img :src="Profile" alt="Profile" />
        <div class="flex text-xs gap-1 leading-[18px]">
          <p class="font-medium">{{ comment.name }}</p>
          <span class="font-normal text-secondary-color">|</span>
          <span class="font-normal text-secondary-color">{{ comment.time }}</span>
        </div>
      </div>
      <div class="flex flex-row gap-2">
        <button><EditIcon /></button>
        <button @click="$emit('action')"><DeleteIcon /></button>
      </div>
    </div>
    <div class="text-sm leading-[22px]">
      {{ comment.text }}
    </div>
    <hr class="mt-2" />
  </div>
</template>

<style scoped></style>
