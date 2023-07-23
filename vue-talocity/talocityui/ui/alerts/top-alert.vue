<script setup>
    import {defineProps,defineEmits} from 'vue';
    import {WhiteCross} from '@talocityui/icons';
    import {colors} from '@talocityui/theme';
    const props = defineProps({
        toggle:Function,
        callToActionLabel:String,
        show:{
            type:Boolean,
            default:false
        },
        message:String,
        color:{
            type:String,
            default:colors['talocity-blue-color']
        }
    })
</script>
<template>
    <div class= "alert backdrop-blur-[2px] flex justify-center w-full"
        :class="{
            overlay : true,
            'show-overlay' : show,
        }"
        :style="{
            backgroundColor: props.color,
        }" 
    >
        <div
            :style="{
                background: 'rgba(0,0,0,0.8)',
                overflow: 'hidden',
                height: '100%',
                width: '100%',
                zIndex: 2,
                alignItems:'center',
                display: 'flex',
                justifyContent: 'center',
            }"
        >

            <div class="flex justify-between pt-4 pb-[15px] items-center">
                <slot name="icon"></slot>
                <span class="py-[2px] pl-2 text-white not-italic font-normal text-sm"> 
                    {{message}}
                </span>
                <span @click="$emit('call-to-action')" v-show="callToActionLabel" :style="{'color':props.color}" class="ml-[3px] text-sm font-semibold cursor-pointer">{{callToActionLabel}}</span>
                <WhiteCross @click="$emit('close-alert')" />
            </div>
        </div>  
    </div>
</template>


<style scoped>
.alert{
    position: fixed;
    top:0;
    left:0;
}
.overlay{
    position: absolute; 
    transform: translateY(-101%);
    z-index: 10;
    transition: 0.5s ease-in-out ;
}
.show-overlay{
    transform: translateY(0%);
}
</style>