<script setup>
import { ref, watch, computed } from 'vue'
import { colors, helpers } from '@talocityui/theme'
import { AddIcon, CrossSmall } from '@talocityui/icons'
const showInput = ref(false),
  inputRef = ref(null),
  inputValue = ref(''),
  selectedOptions = ref(props.value)

const props = defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  value: {
    type: Array,
    default: []
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  },
  maxWidth: {
    type: String,
    default: '100%'
  }
})

const backgroundColor = computed(() => helpers.fadeColor(props.color, '0.08'))
const handleKeyPress = (event) => {
  if (event.key === 'Enter' && inputValue.value.trim() !== '') {
    selectedOptions.value.push(inputValue.value)
    inputValue.value = ''
    showInput.value = false
  }
}

const handleButtonClick = () => {
  showInput.value = true
  inputRef.value.focus()
}
watch(inputRef, () => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})
</script>

<template>
  <div class="flex flex-col font-Inter gap-2 my-5" :style="{ maxWidth: maxWidth }">
    <div class="text-sm font-medium">{{ label }}</div>
    <div class="flex flex-wrap gap-2">
      <div
        v-for="(option, index) in selectedOptions"
        :key="index"
        :style="{
          color: color,
          backgroundColor: backgroundColor
        }"
        class="flex items-center justify-center px-2 text-xs rounded"
      >
        <button @click="selectedOptions.splice(index, 1)" class="pr-0.5">
          <CrossSmall />
        </button>
        <div class="max-w-[100px] break-words py-1.5">
          {{ option }}
        </div>
      </div>
    </div>
    <input
      v-if="showInput"
      ref="inputRef"
      type="text"
      :style="{ backgroundColor: backgroundColor }"
      class="rounded px-2 h-7 w-20 max-w-max text-xs focus:outline-none"
      v-model="inputValue"
      @input="$emit('update:inputValue', $event.target.value)"
      @keypress="handleKeyPress"
    />
    <button
      v-else
      @click="handleButtonClick"
      :style="{ color: color }"
      class="w-max text-xs flex h-7 items-center"
    >
      <AddIcon :color="color" /> New Value
    </button>
  </div>
</template>
<style scoped></style>
