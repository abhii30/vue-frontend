<script setup>
import { ref, watch } from 'vue'
import { colors } from '@talocityui/theme'
import { Cross, Search, VerticalLine } from '@talocityui/icons'
import { Inputs, Buttons } from '@talocityui/ui'
const props = defineProps({
  placeholder: {
    type: Array,
    default: () => []
  },
  textColor: {
    type: String,
    default: 'white'
  },
  bgColor: {
    type: String,
    default: colors['talocity-blue-color']
  },
  name: String,
  title: String,
  uploadedOn: String,
  uploadedBy: String
})
const emit = defineEmits(['update:name', 'update:title', 'update:uploadedOn', 'update:uploadedBy'])
const searchName = ref(props.name)
const searchTitle = ref(props.title)
const searchUploadedBy = ref(props.uploadedBy)
const searchUploadedOn = ref(props.uploadedOn)
watch([searchName, searchTitle, searchUploadedBy, searchUploadedOn], () => {
  if (
    searchName.value === '' &&
    searchTitle.value === '' &&
    searchUploadedBy.value === '' &&
    searchUploadedOn.value === ''
  ) {
    emit('update:name', '')
    emit('update:title', '')
    emit('update:uploadedBy', '')
    emit('update:uploadedOn', '')
  }
})
</script>

<template>
  <div
    class="flex flex-row items-center bg-white outline outline-1 rounded-lg w-full p-1.5"
    :style="{ outlineColor: bgColor }"
  >
    <div class="relative flex text-sm text-primary-color w-1/4">
      <input
        type="text"
        class="h-9 px-9 w-full focus:outline-none"
        :placeholder="placeholder[0]"
        v-model="searchName"
      />
      <Search class="absolute align-middle h-9 mx-2" />
      <Cross
        v-if="searchName"
        class="absolute right-0 h-9 mx-2 cursor-pointer"
        @click="searchName = ''"
      />
      <VerticalLine />
    </div>
    <div class="relative flex text-sm text-primary-color w-1/4">
      <input
        type="text"
        class="h-9 px-9 w-full focus:outline-none"
        :placeholder="placeholder[1]"
        v-model="searchTitle"
      />
      <Search class="absolute align-middle h-9 mx-2" />
      <Cross
        v-if="searchTitle"
        class="absolute right-0 h-9 mx-2 cursor-pointer"
        @click="searchTitle = ''"
      />
      <VerticalLine />
    </div>
    <div class="relative flex text-sm text-primary-color w-1/4 cursor-pointer">
      <input
        type="text"
        class="h-9 px-9 w-full focus:outline-none"
        :placeholder="placeholder[2]"
        v-model="searchUploadedOn"
        disabled
      />
      <div class="absolute w-9 h-9 top-2 left-2">
        <Inputs.DatePicker v-model:dateUploaded="searchUploadedOn" />
      </div>
      <Cross
        v-if="searchUploadedOn"
        class="absolute right-0 h-9 mx-2 cursor-pointer"
        @click="searchUploadedOn = ''"
      />
      <VerticalLine />
    </div>
    <div class="relative flex text-sm text-primary-color w-1/4">
      <input
        type="text"
        class="h-9 px-9 w-full focus:outline-none"
        :placeholder="placeholder[3]"
        v-model="searchUploadedBy"
      />
      <Search class="absolute align-middle h-9 mx-2" />
      <Cross
        v-if="searchUploadedBy"
        class="absolute right-0 h-9 mx-2 cursor-pointer"
        @click="searchUploadedBy = ''"
      />
    </div>
    <Buttons.Primary
      :textColor="textColor"
      :bgColor="bgColor"
      value="Search"
      @click="
        $emit('update:name', searchName),
          $emit('update:title', searchTitle),
          $emit('update:uploadedBy', searchUploadedBy),
          $emit('update:uploadedOn', searchUploadedOn)
      "
    />
  </div>
</template>
