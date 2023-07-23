<script setup>
import { computed } from 'vue'
import { colors, helpers } from '@talocityui/theme'
const props = defineProps({
  type: {
    type: String,
    default: 'question'
  },
  borderRadiusTop: {
    type: Boolean,
    default: false
  },
  borderRadiusBottom: {
    type: Boolean,
    default: false
  },
  number: {
    type: Number,
    default: 1
  },
  value: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  }
})
const backgroundColor = computed(() => helpers.fadeColor(props.color, '0.08'))
</script>

<template>
  <div class="font-Inter flex flex-row gap-2 items-center">
    <div
      class="py-1.5 text-[10px] leading-[18px] min-w-[30px] font-medium text-center"
      :class="[
        borderRadiusTop || type === 'question' ? 'rounded-t-lg' : '',
        borderRadiusBottom || type === 'answer' ? 'rounded-b-lg' : ''
      ]"
      :style="{
        color: type === 'answer' && value === 'No' ? '#FF5555' : color,
        backgroundColor: type === 'answer' && value === 'No' ? '#FF555514' : backgroundColor,
        marginBottom: type == 'question'? '-3px':'0px'
      }"
    >
      {{ type === 'question' ? 'Q' + number + '.' : 'A.' }}
    </div>
    <div
      class="text-sm leading-5 text-base-color"
      :class="[type === 'answer' ? 'font-medium' : 'font-normal']"
    >
     <slot></slot>
    </div>
  </div>
</template>