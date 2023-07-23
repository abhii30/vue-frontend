<script setup>
import { ref } from 'vue'
import {
  InputDropdown,
  InputSalary,
  InputMulti,
  MultiSelect,
  InputRadio,
  PageSwitcher
} from '../components/sfc'
import Content from '../components/sfc/Choices.json'
const updateSalary = (value) => {
  console.log(value)
}
const selectedOption = ref('')
const Salary = ref({
  min: '',
  max: ''
})
let location = [
  { label: 'Option 1', value: 'Option 1' },
  { label: 'Option 2', value: 'Option 2' }
]
const currentPage = ref(1)
const totalPages = ref(5)
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<template>
  <div class="m-5 flex flex-col gap-10">
    <!-- <InputRadio label="Job Visibility" :options="Content.visibility" v-model="selectedOption" />
    <InputDropdown
      label="Type of Function/ Department"
      important="false"
      :choices="Content.choices"
    /> -->
    <InputMulti
      label="Type of function"
      placeholder="e.g. Figma, Python etc."
      :options="Content.data"
    />
    <MultiSelect
      label="Skills"
      placeholder="Ex. HTML, CSS"
      :required="true"
      :options="Content.choices"
    />
    <!-- <InputSalary
      label="Salary"
      :important="true"
      :min="Salary.min"
      :max="Salary.max"
      @update:min="Salary.min = $event"
      @update:max="Salary.max = $event"
    />{{ Salary.min }}, {{ Salary.max }} -->
    <!-- <PageSwitcher
      @prev-page="prevPage"
      @next-page="nextPage"
      :currentPage="currentPage"
      :totalPages="totalPages"
    />{{ currentPage }}/ {{ totalPages }}
    <InputRadio :options="Content.location" /> -->
  </div>
</template>
