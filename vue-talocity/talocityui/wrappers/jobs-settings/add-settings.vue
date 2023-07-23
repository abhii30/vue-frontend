<script setup>
import { ref, onMounted } from 'vue'
import { Buttons } from '@talocityui/ui'
import { DownSmall } from '@talocityui/icons'

const showOptions = ref(false)
const options = ['Free Text', 'File(.pdf, .docx, .jpg)']

const props = defineProps({
  fieldValues: Object,
  bgColor: String,
  fadedColor: String
})

const fieldValues = ref(props.fieldValues)
const toggleDropdown = () => {
  showOptions.value = !showOptions.value
}
const selectOption = (option) => {
  fieldValues.value.input = option
  showOptions.value = false
}
const updateFieldValue = (field, value) => {
  fieldValues[field] = value
}
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      showOptions.value = false
    }
  })
})
</script>

<template>
  <tr class="h-[72px]">
    <td>
      <input
        type="text"
        class="focus:outline-none"
        v-model="fieldValues.title"
        placeholder="Field Name"
        @input="updateFieldValue('title', $event.target.value)"
      />
    </td>
    <td><Buttons.ToggleSwitch v-model:isChecked="fieldValues.enable" :color="bgColor" /></td>
    <td>
      <Buttons.ToggleSwitch v-model:isChecked="fieldValues.mandatory" :color="bgColor" />
    </td>
    <td>
      <div class="dropdown relative">
        <div id="dropdown" class="cursor-pointer flex items-center" @click="toggleDropdown">
          {{ fieldValues.input }}<DownSmall />
        </div>
        <ul v-if="showOptions">
          <li
            v-for="(option, index) in options"
            :key="index"
            class="cursor-pointer text-sm"
            @click="updateFieldValue('input', option), selectOption(option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </td>
    <td class="text-red cursor-pointer" @click="$emit('action')">Remove</td>
  </tr>
</template>

<style scoped>
.dropdown {
  display: flex;
  align-items: center;
}
.dropdown ul {
  position: absolute;
  z-index: 9999;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  list-style: none;
  padding: 4px 8px;
  margin: 10px 0;
  border: 1px solid rgba(0, 19, 37, 0.08);
  box-shadow: 0px 2px 4px -2px rgba(17, 19, 20, 0.12), 0px 2px 8px rgba(17, 19, 20, 0.08);
  border-radius: 8px;
  width: max-content;
}

.dropdown li {
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
}
.dropdown li:hover {
  background: v-bind(fadedColor);
  border-radius: 4px;
}
</style>
