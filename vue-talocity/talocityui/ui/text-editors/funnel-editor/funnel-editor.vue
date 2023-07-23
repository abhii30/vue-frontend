<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import Profile from '../../../../src/assets/Ellipse.png'
import { colors } from '@talocityui/theme'
import { useEditor, EditorContent, Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import EditorButton from './editor-buttons.vue'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'

import { computed, watch, defineEmits } from 'vue'
const content = ref(props.modelValue)

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  }
})

const extensions = computed(() => [
  StarterKit,
  BulletList.configure({
    HTMLAttributes: {
      class: 'my-bullet-list'
    }
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: 'my-number-list'
    }
  })
])

let editor = useEditor({
  content: content.value,
  extensions: extensions.value
})

const emits = defineEmits(['update:modelValue'])
const showButtons = ref(false)
watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.getHTML() === value
    if (isSame) {
      return
    }
    editor.commands.setContent(value, false)
  }
)

onMounted(() => {
  editor = new Editor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: props.placeholder
      })
    ],
    content: props.modelValue,
    onUpdate: () => {
      emits('update:modelValue', editor.getHTML())
    }
  })
    editor.on('focus', handleFocus);
    // editor.on('blur', handleBlur);
})
function handleFocus(){
    showButtons.value = true;
}
// function handleBlur(){
//     showButtons.value = false;
// }
onBeforeUnmount(() => {
  editor.destroy()
})


</script>

<template>
  <div class="h-full">
    <div class="flex flex-col font-Inter gap-1 h-full">
      <div
        class="border box-border rounded-lg border-solid border-[#DADCE0] flex flex-col h-full overflow-y-hidden overflow-x-scroll"
      >
      <div v-if="showButtons" class="flex items-center gap-3 px-3 pt-3">
        <img :src="Profile" alt="profile_pic">
        <p>Anuj Shah</p>
      </div>
        <EditorContent
        class="tool h-auto flex-auto overflow-y-hidden overflow-x-scroll"
        :editor="editor"
        :extensions="extensions"
        />
      <div v-if="showButtons" class="flex toolbar">
        <EditorButton :editor="editor" v-model="showButtons" :color="color" />
      </div>
      </div>
    </div>
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 12px;
  height: 0;
}
::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 8px;
  background-color: #cdd3d8;
  -webkit-box-shadow: inset 0 0 0 1px #cdd3d8;
}
::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}

.font-size {
  display: inline-block;
  margin-right: 8px;
}

.font-size select {
  font-size: 14px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.ProseMirror {
  font-size: 14px;
}
.toolbar {
  border-bottom: 1px solid rgba(218, 220, 224, 1);
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: rgba(0, 19, 37, 0.36);
  pointer-events: none;
  height: 0;
}
.my-bullet-list {
  list-style-type: disc;
}

.my-number-list {
  list-style-type: decimal;
}

.ProseMirror {
  position: relative;
  padding: 16px;
  width: 100% !important;
  height: 100% !important;
  overflow: auto !important;
}

.ProseMirror ul,
.ProseMirror ol {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding-left: 1.5em;
  flex-direction: column;
}

.ProseMirror ul li,
.ProseMirror ol li {
  display: flex;
  align-items: center;
}

.ProseMirror ul li::before {
  content: '\2022';
  margin-right: 0.5em;
}

.ProseMirror ol li::before {
  content: counter(list-item) '. ';
  counter-increment: list-item;
  margin-right: 0.5em;
}
.ProseMirror h2 {
  font-size: 16px;
  font-weight: 600;
}
.ProseMirror-focused {
  /* outline: 1px solid v-bind(color) !important;
  outline-offset: -1px;
  border-bottom-left-radius: 8px !important;
  border-bottom-right-radius: 8px !important; */
}
</style>
