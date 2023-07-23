<script setup>
    import { colors } from '@talocityui/theme'
    import { Buttons } from '@talocityui/ui'
    import {
    BoldIcon,
    ItalicIcon
    } from '@talocityui/icons'

    defineProps({
    editor: {
        type: Object,
        default: null
    },
    color: {
        type: String,
        default: colors['talocity-blue-color']
    },
    modelValue:{
        type:Boolean,
        required:true
    }
    })


</script>

<template>
  <div v-if="editor" class="flex w-full m-0 p-0 justify-between py-2 mx-3 border-t">
        <div class="flex">
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
        </div>
        <div class="flex gap-2">
            <Buttons.Secondary value="Cancel" @action="()=> $emit('update:modelValue',false)" @click="showAreYouSure = true" ></Buttons.Secondary>
            <Buttons.Primary value="Post" @click="showAreYouSure = true" ></Buttons.Primary>
        </div>
  </div>
</template>

<style></style>
