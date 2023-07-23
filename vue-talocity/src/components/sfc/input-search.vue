<script>
import { Search, Cross } from '@talocityui/icons'
export default {
  components: {
    Search,
    Cross
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    clearInput() {
      event.target.value = ''
    }
  }
}
</script>

<template>
  <div class="flex flex-col font-Inter gap-1">
    <div class="text-sm font-medium leading-5">{{ label }}</div>
    <div class="relative flex text-sm">
      <input
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        class="border rounded-lg px-9 h-9 w-screen focus:outline-1 focus:outline-talocity-blue-color"
      />
      <Search class="absolute align-middle h-9 mx-2" />
      <Cross
        v-if="modelValue"
        class="absolute right-0 h-9 mx-2 cursor-pointer"
        @click="clearInput"
      />
    </div>
  </div>
</template>

<style></style>
