<script setup>
import { ref, computed, watch } from 'vue'
import { colors,helpers } from '@talocityui/theme'
import { UpIcon, DownIcon } from '@talocityui/icons'
const showOptions = ref(false)
const requiredError = ref('')
const emit = defineEmits(['update:selected'])
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
  selected: {
    type: [Object, String, Number]
  },
  searchText: {
    type: [String, Number],
    default: ''
  },
  filterOptions: {
    type: Boolean,
    default: true
  },
  requiredError: {
    type: Boolean,
    default: true
  },
  errors: {
    type: Array,
    default: () => []
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  },
  choices: Array,
})
const search = ref(props.selected?.label || props.selected)
const backgroundColor = computed(() => helpers.fadeColor(props.color, '0.08'))
const selectedOption = ref(props.selected)
const filteredOptions = computed(() => {
  if (!props.filterOptions) {
    return props.choices
  } else {
    return props.choices?.filter((option) => {
      if (typeof option === 'string') {
        const isMatching = option?.toLowerCase().includes(search.value.toLowerCase())
        return isMatching
      } else {
        const isMatching = option.label?.toLowerCase().includes(search.value.toLowerCase())
        return isMatching
      }
    })
  }
})

const showDropdown = () => {
  search.value = ''
  showOptions.value = true
}
const hideDropdown = () => {
  setTimeout(() => {
    showOptions.value = false
  }, 200)
}

const filterOptionFunction = () => {
  setTimeout(() => {
    showOptions.value = true
  }, 200)
}
const childErrors = computed(() =>
  [requiredError.value, ...props.errors].filter((error) => error !== '')
)
const checkIfEmpty = () => {
  if (props.required && !selectedOption.value) {
    requiredError.value = 'This cannot be empty'
  } else {
    requiredError.value = ''
  }
}
const selectOption = (option) => {
  selectedOption.value = option
  requiredError.value = ''
}
const clickHandler = (option) => {
  selectOption(option)
  emit('update:selected', selectedOption.value)
  search.value = option.label || option
}
watch(props.selected, (newValue) => {
  console.log('change')
  search.value = newValue
})
</script>
<template>
  <div class="flex flex-col font-Inter gap-1">
    <div class="text-sm font-medium leading-5">
      {{ label }}<span v-if="required" class="text-red-500"> *</span>
    </div>
    <div class="dropdown">
      <input
        autocomplete="off"
        :placeholder="placeholder"
        type="text"
        id="dropdown"
        :required="required"
        v-model="search"
        @focus="showDropdown(), (requiredError = '')"
        @blur="
          hideDropdown(), $emit('update:selected', ''), checkIfEmpty();
          if (!selectedOption) {
            search = ''
          }
        "
        @input="
          filterOptionFunction(),
          $emit('update:searchText', search)
        "
        :style="{
          outlineColor: childErrors.length > 0 ? '#ef4444' : color
        }"
        :class="[
          `border rounded-lg px-4 h-9 w-full text-sm focus:outline-1`,
          {
            ' border-none outline outline-1 ':
              childErrors?.length > 0
          }
        ]"
      />
      <UpIcon v-if="showOptions" class="absolute right-0 h-9 mx-2" />
      <DownIcon v-else class="absolute right-0 h-9 mx-2" />
      <ul v-if="showOptions && filteredOptions?.length !== 0" class="max-h-48 overflow-y-scroll">
        <li
          v-for="(option) in filteredOptions"
          :key="option"
          @click="clickHandler(option)"
          @ontouchstart="selectOption(option)"
          :class="['cursor-pointer',{'flex justify-between check':checkBtn} ]"
        >
          {{ typeof option === 'string' ? option : option.label }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <span
        v-for="(error, index) in childErrors"
        :key="`error-${index}`"
        class="text-red-500 text-sm"
      >
        {{ error }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: flex;
}
.dropdown ul {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
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
  background: v-bind(backgroundColor);
  border-radius: 4px;
}
</style>
