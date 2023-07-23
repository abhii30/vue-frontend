<script>
import { Search, CrossBlue } from '@talocityui/icons'
import { colors, helpers } from '@talocityui/theme'
export default {
  data() {
    return {
      selectedOption: this.selectedArray,
      showOptions: false,
      search: '',
      requiredError: ''
    }
  },
  components: {
    Search,
    CrossBlue
  },
  emits: ['update:selectedArray'],
  props: {
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
    selectedArray: {
      type: Array,
      default: () => []
    },
    errors: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: colors['talocity-blue-color']
    },
    searchText: String,
    options: Object
  },
  computed: {
    filteredOptions() {
      return this.options.filter((option) => {
        const isSelected = this.selectedOption.indexOf(option) > -1
        const isMatching = option.toLowerCase().includes(this.search.toLowerCase())
        return !isSelected && isMatching
      })
    },
    childErrors() {
      return [this.requiredError, ...this.errors].filter((error) => error !== '')
    },
    backgroundColor() {
      return helpers.fadeColor(this.color, '0.08')
    }
  },
  methods: {
    showDropdown() {
      this.showOptions = true
    },
    hideDropdown() {
      setTimeout(() => {
        this.showOptions = false
      }, 200)
    },
    selectOption(option) {
      const index = this.selectedOption.indexOf(option)
      if (index === -1) {
        this.selectedOption.push(option)
      }
      this.showOptions = false
    },
    checkIfEmpty() {
      if (this.required && this.selectedArray.length === 0) {
        this.requiredError = 'This cannot be empty'
      } else {
        this.requiredError = ''
      }
    },
    removeOption(option) {
      const index = this.selectedOption.indexOf(option)
      if (index > -1) {
        this.selectedOption.splice(index, 1)
      }
    },
    filterOptions() {
      setTimeout(() => {
        this.showOptions = true
      }, 200)
    }
  }
}
</script>
<template>
  <div class="flex flex-col font-Inter gap-1">
    <div class="text-sm font-medium leading-5">
      {{ label }}<span v-if="required" class="text-red-500"> *</span>
    </div>
    <div class="flex flex-row flex-wrap gap-1">
      <p
        class="text-sm relative flex border rounded-full px-3 pr-8 h-8 leading-8 max-w-max"
        :style="{
          backgroundColor: backgroundColor,
          color: color
        }"
        v-for="option in selectedArray || selectedOption"
        :key="option.id"
      >
        {{ option }}
        <CrossBlue
          class="absolute right-2 h-8 cursor-pointer"
          @click="removeOption(option), checkIfEmpty()"
          :color="color"
        />
      </p>
    </div>

    <div class="dropdown relative flex text-sm">
      <input
        autocomplete="off"
        type="text"
        id="dropdown"
        :required="required"
        :placeholder="placeholder"
        v-model="search"
        @focus="showDropdown(), (requiredError = '')"
        @blur="hideDropdown(), checkIfEmpty()"
        @input="filterOptions(), $emit('update:searchText', search)"
        :class="[
          `border rounded-lg px-9 h-9 w-full text-sm focus:outline-1`,
          {
            'border-none outline outline-1 ': childErrors.length > 0
          }
        ]"
        :style="{
          outlineColor: childErrors.length > 0 ? '#ef4444' : color
        }"
      />
      <Search class="absolute h-9 flex items-center mx-2" />
      <ul v-if="showOptions && filteredOptions.length !== 0" class="max-h-48 overflow-y-scroll">
        <li
          v-for="option in filteredOptions"
          :key="option"
          :class="{ disabled: selectedOption.indexOf(option) > -1 }"
          @click="
            selectOption(option),
              $emit('update:selectedArray', selectedOption),
              (search = ''),
              checkIfEmpty()
          "
          class="cursor-pointer"
        >
          {{ option }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <span v-for="error in childErrors" :key="error.id" class="text-red-500 text-sm">
        {{ error }}</span
      >
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
  background: v-bind(backgroundColor);
  border-radius: 4px;
}
</style>
