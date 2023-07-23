<script setup>
import { FileIcon, CrossFile } from '@talocityui/icons'
import {Bars} from '@talocityui/ui';
import { defineProps, defineEmits } from 'vue'
defineProps({
  files: {
    type: Array
  },
  percent: {
    type: String
  }
})
const emit = defineEmits(['delete'])
function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
</script>

<template>
  <div
    class="flex flex-col rounded-lg bg-[rgba(0,19,37,0.04)] mt-3"
    v-for="(f, index) in files"
    :key="index"
  >
    <div class="file-content flex justify-between pl-2">
      <div class="flex">
        <div class="pt-2 pr-1">
          <FileIcon />
        </div>

        <div class="file-properties flex flex-col">
          <span class="file-name font-normal text-xs leading-[18px] pt-2">{{ f.name }}</span>
          <span class="file-size font-normal text-[10px] leading-4 text-secondary-color">{{ formatBytes( f.size ) }}</span>
        </div>
      </div>
      <div class="pr-3 pt-2">
        <CrossFile @click="$emit('delete', f)" />
      </div>
    </div>
    <!-- <div class="progress-bar pl-3 pr-3 pb-2">
      <Bars.LinearProgressionBar :percent="percent" />
    </div> -->
  </div>
</template>

<style scoped></style>