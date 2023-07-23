<script setup>
import { defineProps, ref, computed } from 'vue'
import { Search, CrossBlue } from '@talocityui/icons'

const showOptions = ref(false)
const searchText = ref('')

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Array,
    default() {
      return []
    }
  },
  options: Object
})
const selectedOption = ref([])
const filteredOptions = computed(() => {
  return props.options.filter((option) => {
    const isSelected = selectedOption.value.indexOf(option.value) > -1
    const isMatching = option.label.toLowerCase().includes(searchText.value.toLowerCase())
    return !isSelected && isMatching
  })
})
const showDropdown = () => {
  showOptions.value = true
}
const hideDropdown = (delay = 100) => {
  setTimeout(() => {
    showOptions.value = false
  }, delay)
}
const selectOption = (option) => {
  const index = selectedOption.value.indexOf(option.value)
  if (index === -1) {
    selectedOption.value.push(option.value)
    console.log(option.value)
  }
  showOptions.value = false
}
const removeOption = (option) => {
  const index = selectedOption.value.indexOf(option)
  if (index > -1) {
    selectedOption.value.splice(index, 1)
  }
}
const filterOptions = () => {
  setTimeout(() => {
    showOptions.value = true
  }, 100)
}
</script>
<template>
  <div class="flex flex-col font-Inter gap-1">
    <div class="text-sm font-medium leading-5">
      {{ label }}<span v-if="required" class="text-red-500"> *</span>
    </div>
    <div class="flex flex-row gap-2">
      <p
        class="text-sm my-2 relative flex flex-row bg-talocity-blue-color-faded text-talocity-blue-color border rounded-full px-3 pr-8 h-8 leading-8 max-w-max"
        v-for="option in selectedOption"
        :key="option.id"
      >
        {{ option }}
        <CrossBlue class="absolute right-2 h-8 cursor-pointer" @click="removeOption(option)" />
      </p>
    </div>

    <div class="dropdown text-sm">
      <input
        type="text"
        id="dropdown"
        :placeholder="placeholder"
        v-model="searchText"
        @focus="showDropdown"
        @blur="hideDropdown"
        @input="filterOptions"
        class="border rounded-lg px-11 h-9 w-full text-sm focus:outline-1 focus:outline-talocity-blue-color"
      />
      <Search class="absolute h-9 mx-4" />
      <ul v-if="showOptions">
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          :class="{ disabled: selectedOption.indexOf(option.value) > -1 }"
          @click="selectOption(option)"
          class="cursor-pointer"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: flex;
}
.dropdown .icon {
  position: absolute;
}

.dropdown ul {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #fff;
  list-style: none;
  padding: 4px 8px;
  margin: 10px 0;
  border: 1px solid rgba(0, 19, 37, 0.08);
  box-shadow: 0px 2px 4px -2px rgba(17, 19, 20, 0.12), 0px 2px 8px rgba(17, 19, 20, 0.08);
  border-radius: 8px;
}

.dropdown li {
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
}

.dropdown li:hover {
  background: rgba(16, 204, 203, 0.08);
  border-radius: 4px;
}
.dropdown li.disabled {
  color: #a0aec0;
  cursor: not-allowed;
}
</style>
