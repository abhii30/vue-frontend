<script setup>
import { ref } from 'vue'
import {colors} from '@talocityui/theme'
const props = defineProps({
  id: {
    type: String
  },
  label: {
    type: String
  },
  isChecked: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  }
})
const checked = ref(props.isChecked)
</script>
<template>
  <input
    type="checkbox"
    :id="id"
    v-model="checked"
    :checked="isChecked"
    class="my-checkbox"
    :disabled="isDisabled"
    @change="$emit('update:modelValue', checked)"
  />
  <label :for="id" class="text-sm font-normal">{{ label }}</label>
</template>
<style scoped>
[type='checkbox'] {
  opacity: 0;
  display: none;
}
[type='checkbox'] + label {
  position: relative;
  padding-left: 34px;
  cursor: pointer;
  display: inline-block;
}
[type='checkbox'] + label::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  outline: 1.5px solid rgba(0, 19, 37, 0.16);
  border-radius: 4px;
  left: 0;
  top: 0;
}
[type='checkbox']:checked + label::before {
  background-size: contain;
  background-color: v-bind(color);
  background-image: url('@/assets/tick.svg');
  background-position: center center;
  background-size: 13px 13px;
  outline: none;
  box-shadow: 0 0 0 1.5px v-bind(color);
}
input[type='checkbox']:disabled {
  border: 1.5px solid rgba(0, 19, 37, 0.16);
  border-radius: 4px;
  color: rgba(0, 19, 37, 0.36);
}
input[type='checkbox']:disabled + label {
  color: rgba(0, 19, 37, 0.36);
}
</style>
