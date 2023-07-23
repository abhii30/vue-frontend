<script setup>
  import { colors, helpers } from '@talocityui/theme';
  import { computed } from 'vue';
  const props = defineProps({
    isEnabled: {
      type: Boolean,
      default: true
    },
    value:{
      type:String,
      default:""
    },
    isActive:{
      type:Boolean,
      default:false
    },
    color:{
      type:String,
      default:colors['talocity-blue-color']
    },
    textPadding:{
      type:String,
      default:'20px'
    }
  });

  const fadedColor8 = computed(()=>helpers.fadeColor(props.color,0.08));

</script>


<template>
    <button
      :class="[
        'py-4 w-full rounded-lg transition-colors font-medium text-base leading-6 text-left',
        props.isEnabled ? `hover:bg-[${fadedColor8}]` 
        : 'text-gray-400 cursor-not-allowed !important',
      ]"
      :style="{
        color: props.isActive && props.color,
        'transition-duration':props.isEnabled?'500ms':'0ms',
      }"
      :disabled="!props.isEnabled"
    >
      {{ props.value }}
    </button>
  </template>
  

<style scoped>
  button {
    background-color: transparent;
    color: black;
    padding: 16px v-bind(textPadding);
  }

  button:hover:not(.cursor-not-allowed):not([disabled]) {
    background-color: v-bind(fadedColor8);
  }

  button:active:not(.cursor-not-allowed):not([disabled]) {
    background-color: v-bind(fadedColor16)
  }

  button[disabled] {
    color: vi-bind(colors[hint-color]);
    cursor: not-allowed;
  }

  button.cursor-not-allowed {
    cursor: default !important;
  }

  </style>