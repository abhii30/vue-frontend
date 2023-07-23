<script setup>
import { Cross } from '@talocityui/icons'

defineProps({
  show: {
    type: Boolean,
    default: true
  },
  header: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div v-if="show" class="backdrop" @click="$emit('update:show', false)"></div>
  <div :class="{ popup: true, active: show }">
    <div class="flex flex-col">
      <button @click="$emit('update:show', false)" class="ml-[22px] mt-[15px]">
        <Cross />
      </button>
      <div
        class="font-Inter flex flex-col gap-[10px] justify-center text-left h-full mx-5 mt-[18px] mb-[45px]"
      >
        <h1 class="font-Inter font-semibold text-xl">{{ header }}</h1>
        <span class="text-sm font-normal">{{ body }}</span>
        <slot name="button"> </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(245, 245, 247, 0.88);
  z-index: 99;
}
.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
  min-width: 350px;
  width: 20%;
  height: max-content;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  display: none;
  transition: 0.5s ease-in-out; /* animate the 'right' property */
}
.popup.active {
  display: block;
}
</style>