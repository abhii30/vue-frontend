<script>
import { UpIcon, DownIcon } from '@talocityui/icons'
export default {
  data() {
    return {
      selectedOption: '',
      showOptions: false
    }
  },
  components: {
    UpIcon,
    DownIcon
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    choices: Object
  },
  methods: {
    showDropdown() {
      this.showOptions = true
    },
    hideDropdown() {
      setTimeout(() => {
        this.showOptions = false
      }, 100)
    },
    selectOption(option) {
      this.selectedOption = option.value
      this.showOptions = false
    }
  }
}
</script>
<template>
  <div class="flex flex-col font-Inter gap-1">
    <div class="text-sm font-medium leading-5">
      {{ label }}<span :v-if="important" class="text-red-500"> *</span>
    </div>
    <div class="dropdown">
      <input
        type="text"
        id="dropdown"
        v-model="selectedOption"
        @focus="showDropdown"
        @blur="hideDropdown"
        class="border rounded-lg px-4 h-9 w-full text-sm focus:outline-1 focus:outline-talocity-blue-color"
      />
      <UpIcon v-if="showOptions" class="absolute right-0 h-9 mx-2" />
      <DownIcon v-else class="absolute right-0 h-9 mx-2" />
      <ul v-if="showOptions">
        <li
          v-for="option in choices"
          :key="option.value"
          @click="selectOption(option)"
          class="cursor-pointer"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
    <p>{{ selectedOption }}</p>
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
</style>
