<script setup>
    defineProps({
        pageBackgroundColor:{
            type:String,
            required:true,
            default:"#10CCCB"
        },
        pageTextColor:{
            type:String,
            required:true,
            default:"#FFFFFF"
        }
    })
</script>

<template>
    <div class="preview-panel border rounded-lg text-center" :style="{'background-color' : pageBackgroundColor}">
        <p class="py-3 font-Inter text-sm font-normal leading-[18px]" :style="{color:pageTextColor}">If this text is clearly visible then you have chosen the right colors.</p>
    </div>
</template>


<style scoped>

</style>