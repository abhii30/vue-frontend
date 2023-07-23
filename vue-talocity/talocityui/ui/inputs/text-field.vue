<script setup>
import { Cross } from '@talocityui/icons'
import { colors } from '@talocityui/theme'
import { ref, computed } from 'vue'
const requiredError = ref('')

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  requiredError: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: Boolean,
    default: false
  },
  labelIcon: {
    type: Boolean,
    default: false
  },
  errors: {
    type: Array,
    default: () => []
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  }
})
const childErrors = computed(() =>
  [requiredError.value, ...props.errors].filter((error) => error !== '')
)
const checkIfEmpty = () => {
  if (!props.value && props.requiredError && props.required) {
    requiredError.value = 'This cannot be empty'
  } else {
    requiredError.value = ''
  }
}
</script>

<template>
  <div class="flex flex-col font-Inter gap-1">
    <div class="text-sm font-medium leading-5 flex">
      <div v-if="labelIcon" class="px-1">
        <slot name="labelIcon" class=""></slot>
      </div>
      {{ label }}<span v-if="required" class="text-red-500"> *</span>
    </div>
    <div  class="relative flex text-sm">
      <input
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
        @blur="checkIfEmpty(), $emit('update:errors', [])"
        :style="{
          outlineColor: childErrors.length > 0 ? '#ef4444' : color
        }"
        :class="[
          `border rounded-lg h-9 w-full focus:outline-1 `,
          icon ? `px-9` : `px-4`,
          {
            ' border-none outline outline-1':
              childErrors?.length > 0
          }
        ]"
      />
      <div v-if="icon" class="absolute h-9 flex items-center justify-center w-9">
        <slot name="icon"></slot>
      </div>
      <Cross
        v-if="value"
        class="absolute right-0 h-9 mx-2 cursor-pointer"
        @click="
          $emit('update:value', '');
          if (props.required) {
            requiredError = 'This cannot be empty'
          }
        "
      />
    </div>
    <div class="flex flex-col">
      <span
        v-for="(error, index) in childErrors"
        :key="label + 'error-' + index"
        class="text-red-500 text-sm"
      >
        {{ error }}</span
      >
    </div>
  </div>
</template>

<style></style>
