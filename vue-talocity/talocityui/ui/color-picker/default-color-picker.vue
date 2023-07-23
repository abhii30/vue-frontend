<script setup>

    import {ref, watch} from 'vue'
    import AddColor from "./add-color.vue"
    import {colors} from "@talocityui/theme"
    
    const props = defineProps({
        selectedColor:{
            type:String,
            required:true,
            default:""
        },
        colorWrapperName:{
            type:String,
            required:true,
            default:"Color Panel"
        },
        placeholder:{
            type:String,
            required:true,
            default:colors["talocity-blue-color"]
        },
        defaultValue:{
            type:String,
            required:true,
            default:colors["talocity-blue-color"]
        },
        textColor:{
            type:String,
            default:colors["talocity-blue-color"]
        },
    })

    const pageColor = ref(props.selectedColor)
    const emits = defineEmits(['update:selectedColor'])

    watch(props.selectedColor,()=>{
        pageColor.value = props.selectedColor;
    })
    watch(pageColor,(newValue)=>{ 
        emits('update:selectedColor',newValue)
    })
</script>

<template>
        <div>
            <div class="flex justify-between pb-1">
                <span class="text-sm font-semibold font-Inter">{{ colorWrapperName }}</span>
                <span 
                    class="text-sm font-Inter font-medium cursor-pointer"
                    :style="{
                        color: textColor
                    }"
                    @click="pageColor=defaultValue"
                >
                    Reset to default color
                </span>
            </div>
            <div class="color_panel items-center justify-center flex space-x-3" >
                <input type="text" :placeholder="placeholder" class="text-sm font-Inter font-normal leading-[18px] border px-4 rounded-lg h-9 w-full focus:outline-none"
                v-model="pageColor" />
                <AddColor v-model="pageColor" :color="textColor"/>
                <div class="color-preview rounded-full h-9 w-9 border border-[#A3AAB0] flex-shrink-0" :style="{'background-color':pageColor}"></div>
            </div>
        </div>
</template>

<style>

.v-application__wrap {
  min-height: 0vh !important;
}

.v-color-picker__controls{
  padding: 0px !important;
}

.color-picker{
  padding: 10px ;
  padding-bottom: 0px;
  border: 1px solid rgba(0, 19, 37, 0.08) !important;
  box-shadow: 0px 2px 4px -2px rgba(17, 19, 20, 0.12), 0px 2px 8px rgba(17, 19, 20, 0.08) !important;
  border-radius: 8px !important;
}
.v-color-picker-canvas{
  border-radius: 4px;
}
.v-btn.v-btn--variant-plain{
  display: none;
}

.v-color-picker-preview__dot {
  display: none ;
}

.v-color-picker-preview__alpha{
    display: none !important;
}
.v-color-picker-preview{
    margin-bottom: 0px !important;
}


</style>