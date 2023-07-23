<script setup>
import { ref } from 'vue'
import { colors, helpers } from '@talocityui/theme'
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  }
})

const selectedOption = ref(props.modelValue)
</script>

<template>
  <div class="flex flex-col font-Inter gap-1">
    <label class="text-sm font-medium leading-5"
      >{{ label }} <span v-if="required" class="text-red-500"> *</span></label
    >
    <div class="flex gap-10">
      <div v-for="(option, index) in options" :key="index" class="flex gap-2 items-center">
        <input
          class="input-radio"
          type="radio"
          :id="option.value"
          :value="option.value"
          :disabled="option.state === 'disabled'"
          :checked="option.value === modelValue" 
          v-model="selectedOption"
          @input="$emit('update:modelValue', option.value)"
        />
        <label
          :for="option.value"
          class="text-sm font-normal text-base-color leading-6"
          :class="{
            'text-hint-color': option.state === 'disabled'
          }"
        >
          {{ option.label }}</label
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-radio {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 21.6px;
  height: 21.6px;
  border: 1.5px solid rgba(0, 19, 37, 0.16);
  border-radius: 50%;
  cursor: pointer;
}
.input-radio:checked {
  border: none;
}
.input-radio:checked::before {
  content: '';
  color: v-bind(color);
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: transparent;
  box-shadow: inset 0 0 0 8.4px;
}
.input-radio[disabled] {
  cursor: not-allowed;
}
</style>
