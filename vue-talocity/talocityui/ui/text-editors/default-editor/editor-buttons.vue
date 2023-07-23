<script setup>
import { ref, defineEmits } from 'vue'
import { colors } from '@talocityui/theme'
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  NumberedListIcon,
  BulletedListIcon,
  CopyIcon,
  StrikeThroughIcon,
  HeadingIcon
} from '@talocityui/icons'

defineProps({
  editor: {
    type: Object,
    default: null
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  }
})

const emit = defineEmits(['updateText'])
const text = ref('')
const pasteClipboardText = async (text) => {
  try {
    text = await navigator.clipboard.readText()
    console.log(text)
    emit('updateText', text)
  } catch (err) {
    console.error('Failed to read clipboard text: ', err)
  }
}
</script>

<template>
  <div v-if="editor" class="flex m-0 p-0">
    <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="[{ 'is-active': editor.isActive('heading', { level: 2 }) }, 'py-[6px] pl-4 px-1']"
    >
      <HeadingIcon :active="editor.isActive('heading')" :color="color"/>
    </button>

    <button
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="[{ 'is-active': editor.isActive('bold') }, 'py-[6px] px-1']"
    >
      <BoldIcon :active="editor.isActive('bold')" :color="color"/>
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="[{ 'is-active': editor.isActive('italic') }, 'py-[6px] px-1']"
    >
      <ItalicIcon :active="editor.isActive('italic')" :color="color"/>
    </button>

    <button
      @click="editor.chain().focus().toggleUnderline().run()"
      :class="[{ 'is-active': editor.isActive('underline') }, 'py-[6px] px-1']"
    >
      <UnderlineIcon :active="editor.isActive('underline')" :color="color"/>
    </button>

    <button class="strike-through py-2 px-1" :disabled="true">
      <StrikeThroughIcon />
    </button>

    <button
      @click="editor.chain().focus().toggleOrderedList().run()"
      :class="[{ 'is-active': editor.isActive('orderedList') }, 'px-1']"
    >
      <NumberedListIcon :active="editor.isActive('orderedList')" :color="color"/>
    </button>

    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="[{ 'is-active': editor.isActive('bulletList') }, 'pl-2 pr-1']"
    >
      <BulletedListIcon :active="editor.isActive('bulletList')" :color="color"/>
    </button>

    <button class="strike-through py-2 px-1" :disabled="true">
      <StrikeThroughIcon />
    </button>
    <button class="px-2 py-[10px]" @click="pasteClipboardText(text)">
      <CopyIcon />
    </button>
  </div>
</template>

<style></style>
