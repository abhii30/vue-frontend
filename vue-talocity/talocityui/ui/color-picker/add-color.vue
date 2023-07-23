<script setup>

    import { ref,computed } from 'vue'
    import AddColor from "./add-color.png"
    import {colors,helpers} from "@talocityui/theme"
    const showColorPicker = ref(false)
    const props = defineProps({
      modelValue:{
        type:String,
        default:colors['talocity-blue-color']
      },
      color:{
        type:String,
        default:colors['talocity-blue-color']
      }
    })
    const emits = defineEmits(['update:modelValue'])
    const color = ref(props.modelValue)
    const onColorChange = () =>{
        emits('update:modelValue',color.value)
    }

    const backgroundColor = computed(()=>helpers.fadeColor(props.color,'0.08'))
    
</script>

<template>
  <div class="color-picker-container">
    <div :class="[`flex items-center justify-center h-9 w-9 rounded-full flex-shrink-0 cursor-pointer`]"
      @click="
          () => {
            showColorPicker = true;
          }
        "
      :style="{
        'transition-duration':showColorPicker?'200ms':'0ms',
        backgroundColor: backgroundColor
      }"
    >
      <img :src="AddColor" />
    </div>
    <v-app class="color-picker-wrapper m-0">
        <v-color-picker 
          elevation="1"
          class="color-picker"
          v-model="color" 
          v-if="showColorPicker"
          v-click-outside="() => {
              showColorPicker = false;
            }"
          @update:modelValue="onColorChange"
          canvas-height="96px"
          width="232px"
          dot-size="14px"
          hide-inputs
        >
      </v-color-picker>
  </v-app>
</div>
</template>

<style scoped>

.color-picker-container {
  position: relative;
}

.color-picker {
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 2;
}

</style>