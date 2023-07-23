<script setup>
//     import { ref } from 'vue'
//   import { Modals } from '@talocityui/ui'
    import SideBar from './sidebar/sidebar-view.vue'  
    // const props = defineProps({
	// 	showModal:{
	// 		type:Boolean,
	// 		default:false
	// 	}
	// })
    // const changeShowModal = ref(true)
</script>

<template>  
    <!-- <Modals.RightSideWindow v-model:show="changeShowModal" width="max-content">
        <template #body> -->
        <div class="font-Inter flex flex-row h-full w-full">
            <div class="min-w-[268px]">
                <SideBar />
            </div>

        <div class="funnel-horizontal-line"></div>
        <div class="funnel-details px-5 w-full">
            <div class="flex flex-col">

                <div class="flex justify-between">
                    <div class="flex flex-col">
                        <div class="flex flex-col">
                            <p class="text-xs leading-[18px] text-secondary-color">Applied to</p>
                            <div class="flex flex-row gap-0.5 font-medium items-center leading-10">
                                <div class="job-title text-xl">Sales Executive,</div>
                        
                                <div class="job-location text-sm">Mumbai</div>
                                <span>|</span>
                                <div class="job-location text-sm">53467</div>
                            </div>
                        </div>
                        <slot name="dropdown"></slot>
                    </div>

                    <div class="">
                        <slot name="button"></slot>
                    </div>

                </div>

                <div class="flex mt-4 gap-5">
                    <slot name="score-card"></slot>
                 
                    <slot name="main-content"></slot>
            
                </div>
            </div>
        </div>
    </div>
<!-- </template>
</Modals.RightSideWindow> -->
</template>

<style scoped>
.funnel-horizontal-line {
  border-right: 1px solid rgba(0, 19, 37, 0.08);
  height: 120%;
  margin-top: -20%;
}
</style>