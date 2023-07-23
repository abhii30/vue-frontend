<script setup>
import { ref, watch, defineEmits } from 'vue'
import { colors } from '@talocityui/theme'
import { Buttons } from '@talocityui/ui'
import { LockIcon } from '@talocityui/icons'

const props = defineProps({
  assessmentType: {
    type: String,
    required: true
  },
  locked: {
    type: Boolean,
    default: false
  },
  toggleValue: {
    type: Boolean,
    default: false
  },
  lockedValue: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  }
})
const enable = ref(props.toggleValue)
const isLocked = ref(props.lockedValue)
const emits = defineEmits(['update:toggleValue'])
watch(enable, () => {
  emits('update:toggleValue', enable.value)
})
</script>

<template>
  <div
    class="flex flex-col border border-[#D6D9DC] w-full rounded-[5px]"
    @click="$emit('update:lockedValue', !isLocked)"
  >
    <div class="flex justify-between items-center pl-3 pt-3.5 pb-1.5">
      <div class="flex items-center">
        <span class="text-sm font-medium font-Inter pr-1" :class="[locked ? 'text-[#A3AAB0]' : '']">
          {{ assessmentType }}</span
        >
        <LockIcon v-if="locked" class="cursor-pointer"></LockIcon>
      </div>
      <Buttons.ToggleSwitch
        v-model:isChecked="enable"
        :isDisabled="locked"
        class="pr-3.5"
        :color="color"
      ></Buttons.ToggleSwitch>
    </div>
    <div class="pl-3 pb-3">
      <span
        class="font-Inter text-xs leading-5 font-medium"
        :style="[{ color: enable ? color : '#A3AAB0' }, { cursor: enable ? 'pointer' : '' }]"
        >Configure Assessment</span
      >
    </div>
  </div>
</template>

<style scoped></style>
