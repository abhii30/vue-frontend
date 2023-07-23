<script setup>
import { Inputs,Buttons } from '@talocityui/ui'

defineProps({
  show: {
    type: Boolean,
    default: true
  },
  choices:{
    type:Array,
    default:()=>[]
  }
})
</script>

<template>
  <div v-if="show" class="backdrop"></div>
  <div :class="{ popup: true, active: show }">
    <div class="font-Inter justify-center text-left h-full mx-5">
      <div class="flex flex-col pt-10">
        <div class="flex flex-col gap-4">
          <p class="font-semibold leading-7 text-2xl">Allow another Round</p>
          <p class="text-sm font-normal leading-[22px]">
            At which stage would you like the jobseeker to take another round?
          </p>
          <Inputs.DropDown :choices="choices" label="Select Stage" />
        </div>
        <div class="flex flex-col gap-2 py-5">
          <Buttons.Primary value="Confirm" />
          <Buttons.Secondary
            value="Cancel"
            @action="
              () => {
                $emit('update:show', false)
              }
            "
          />
        </div>
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
