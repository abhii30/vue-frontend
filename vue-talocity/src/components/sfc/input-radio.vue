<script setup>
import { ref } from 'vue'
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
  }
})

const selectedOption = ref(props.modelValue)
</script>

<template>
  <div class="flex flex-col font-Inter gap-1">
    <label class="text-sm font-medium leading-5"
      >{{ label }} <span :v-if="important" class="text-red-500"> *</span></label
    >
    <div class="flex gap-10">
      <div v-for="(option, index) in options" :key="index" class="flex gap-2 items-center">
        <input
          class="input-radio"
          type="radio"
          :id="option.value"
          :name="name"
          :value="option.value"
          v-model="selectedOption"
          @change="$emit('update:modelValue', selectedOption)"
        />
        <label :for="option.value" class="text-sm font-normal text-base-color leading-6">{{
          option.label
        }}</label>
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
  color: rgba(16, 204, 203, 1);
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: transparent;
  box-shadow: inset 0 0 0 8.4px;
}
</style>
