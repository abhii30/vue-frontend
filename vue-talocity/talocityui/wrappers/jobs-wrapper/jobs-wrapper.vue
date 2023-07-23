<script setup>
import { Star } from '@talocityui/icons'
import { computed } from 'vue'
import { colors } from '@talocityui/theme'

const props = defineProps({
  job: {
    type: Object,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  }
})  
const date = computed(() => new Date(props.job.last_updated))
</script>

<template>
  <div
    :class="['box-border rounded-lg py-3 px-4 flex flex-col w-full outline outline-[0.25px]']"
    :style="{
      outlineColor: active ? color : colors['outline-color']
    }"
  >
    <h1 class="font-sans font-medium leading-[22px] text-sm text-base-color">
      {{ job.title }}
    </h1>
    <h3 class="font-sans font-normal text-xs leading-[18px]">
      {{
        job.remote_policy === 'Remote'
          ? 'Remote'
          : job.location.length > 1
          ? 'Multiple Locations'
          : job.location[0]
      }}
    </h3>
    <div class="flex justify-between">
      <div
        v-if="job.last_updated"
        class="last-updated font-sans text-[10px] leading-4 text-secondary-color"
      >
        Last Updated:
        {{ date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
      </div>
      <div v-else></div>
      <div class="star" @click="$emit('toggle', job)">
        <Star :starred="job.is_starred" />
      </div>
    </div>
  </div>
</template>

<style></style>
