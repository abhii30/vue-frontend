<script setup>
import { ref, computed,watch } from 'vue'
import { UploadIcon } from '@talocityui/icons'
import { colors, helpers } from '@talocityui/theme'
import FileView from './uploaded-file.vue'
const emit = defineEmits('update:file')
const props = defineProps({
  accept: {
    type: Array,
    required: true,
    default: () => []
  },
  file: Array,
  allowMultiple: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String,
    default: colors['talocity-blue-color']
  }
})
const allFiles = ref(props.file)
const isDragOver = ref(false)
const progress = ref(0)
function setIsDragOver(isDragOverval) {
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = isDragOverval
}
const acceptInput = props.accept?.join(',')

const firstTwoAcceptInputSpan = props.accept.filter((fileExtension, index) => {
  return index < props.accept?.length - 1
})

const acceptInputSpan = firstTwoAcceptInputSpan.join(',')

function dropHandler(event) {
  event.preventDefault()
  event.stopPropagation()
  console.log(event)
  const dropFiles = event.dataTransfer.files
  for (const file of dropFiles) {
    allFiles.value.push(file)
  }
  isDragOver.value = false
}

function deleteFile(file) {
  allFiles.value = allFiles.value.filter((f) => f !== file)
  emit('update:file', allFiles.value)
}

function handleFileSelected(event) {
  if (props.allowMultiple) {
    const selectedFiles = event.target.files
    for (const file of selectedFiles) {
      allFiles.value.push(file)
    }
  } else {
    const selectedFile = event.target.files[0]
    allFiles.value = [selectedFile]
  }
  emit('update:file', allFiles.value)
  console.log(event.target.files)
}

const fadedColor = computed(() => helpers.fadeColor(props.textColor, 0.08))

function uploadFile(event, file) {
  // const formData = new FormData();
  // formData.append('file', file);
  // const xhr = new XMLHttpRequest();
  // xhr.upload.addEventListener('progress', function(event) {
  //     if (event.lengthComputable) {
  //         const percentComplete = Math.round((event.loaded / event.total) * 100);
  //         progress.value = percentComplete;
  //     }
  // });
  // xhr.open('POST', '/upload-file', true);
  // xhr.send(formData);
}

watch(props.file, (newVal) => {
  console.log(newVal)
  allFiles.value = newVal
})
</script>

<template>
  <div class="">
    <div
      :class="{ 'file-dropBox': isDragOver }"
      class="upload-file flex flex-col align-center border rounded-lg border-dashed border-[#DADCE0] w-full"
      @drop="dropHandler($event)"   
      @dragover="setIsDragOver(true)"
      @dragleave="setIsDragOver(false)"
    >
      <div class="pt-5 pb-2">
        <UploadIcon />
      </div>

      <span class="font-normal text-xs leading-[18px]"
        >Drag and drop or
        <label
          class="file-input cursor-pointer inline-block font-medium"
          :style="{
            color: textColor
          }"
        >
          <input
            type="file"
            @change="handleFileSelected($event)"
            :accept="acceptInput"
            :multiple="allowMultiple"
          />
          Choose File
        </label>
        to upload.
      </span>

      <span class="font-normal text-xs leading-[18px] pb-6 text-secondary-color"
        >{{ acceptInputSpan }} or {{ accept[accept.length - 1] }}</span
      >
    </div>

    <div class="pt-3">
      <FileView :files="allFiles" @delete="deleteFile" :percent="progress" />
    </div>
  </div>
</template>

<style scoped>
input[type='file'] {
  display: none;
}

.file-dropBox {
  border: 1px solid v-bind(textColor) !important;
  background-color: v-bind(fadedColor);
}
</style>
