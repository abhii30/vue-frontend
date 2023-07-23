<script setup>
import { CloseIcon } from '@talocityui/icons'

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  width: {
    type: [String, Number],
    default: 'max-content'
  }
})
</script>

<template>
  <div v-if="show" class="backdrop" @click="$emit('update:show', false)"></div>
  <div :class="{ popup: true, active: show }" :style="{ width: width }">
    <button @click="$emit('update:show', false)">
      <CloseIcon />
    </button>
    <slot name="body"> </slot>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.popup {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  min-width: 400px;
  height: 100vh;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  transform: translateX(101%);
  transition: 0.5s ease-in-out; /* animate the 'right' property */
}
.popup.active {
  transform: translateX(0%);
}
</style>