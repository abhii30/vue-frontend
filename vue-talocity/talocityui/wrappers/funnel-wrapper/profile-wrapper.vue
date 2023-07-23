<script setup>
import { LinkedinBig, ShareIcon } from '@talocityui/icons'
import ProfileImage from '../../../src/assets/profile-image.svg'
defineProps({
  profilePic: {
    type: String,
    default: ProfileImage
  },
  name: {
    type: String,
    default: ''
  },
  contact: {
    type: String,
    default: ''
  },
  linkedIn: {
    type: String,
    default: ''
  },
  share: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="flex flex-col items-center font-Inter">
    <img :src="profilePic" alt="Profile Pic" class="w-16 h-16 rounded-2xl" />
    <div class="mt-4 mb-3 flex flex-col items-center">
      <div class="font-semibold text-xl text-primary-color leading-6">{{ name }}</div>
      <div class="font-normal text-base text-secondary-color leading-6">+91 {{ contact }}</div>
    </div>
    <div class="flex flex-row items-center gap-2">
      <a :href="linkedIn"><LinkedinBig /></a>
      <a :href="share"><ShareIcon /></a>
    </div>
  </div>
</template>