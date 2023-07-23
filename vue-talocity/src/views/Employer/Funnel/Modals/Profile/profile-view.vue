<script setup>
import { ref, computed } from 'vue'
import { Buttons, Inputs, TextEditors } from '@talocityui/ui'
import { useNavStore } from '@/stores/NavStore'
import { EmployerFunnel } from '@/layouts'
import { Modals } from '@talocityui/ui'
const NavStore = useNavStore()

// AlertStore.showAlert("Errror MessaGE",2000)
const props = defineProps(['showModal'])
//     {
// 	showModal:{
// 		type:Boolean,
// 		default:false
// 	}
// }

console.log(props.showModal)
console.log('Hello')
// NavStore.setActiveFunnelSideBarTab("Profile")
let changeShowModal = computed(() => props.showModal)
const sideTabs = ['Basic Details', 'Resume', 'Comments']
const comments = ref([
  {
    name: 'Mahesh',
    time: '2 days ago',
    text: 'Mahesh is a bright individual. He came across as professional during all our conversations. He spoke competently and confidently about his experience as a staff accountant.'
  },
  {
    name: 'Suresh',
    time: '2 days ago',
    text: 'Mahesh is a bright individual. He came across as professional during all our conversations. He spoke competently and confidently about his experience as a staff accountant.'
  }
])
const stage = ['Domain Assessment', 'Typing Assessment', 'Voice Assessment', 'Video Assessment']
const changedStage = ref('Domain Assessment')

const onClickTab = (tab) => {
  NavStore.setActiveJobSeekerFunnelTab(tab)
}

const deleteComment = (index) => {
  comments.value.splice(index, 1)
}
</script>

<template>
  <Modals.RightSideWindow :show="true" width="50%">
    <template #body>
      <EmployerFunnel>
        <template #dropdown>
          <Inputs.DropDown
            label="Change Stage"
            :choices="stage"
            v-model:selected="changedStage"
            class="mt-3 mb-4 w-full"
            :color="details?.background_color"
          />
        </template>

        <template #main-content>
          <div class="flex flex-col w-full">
            <div class="flex w-full">
              <div
                class="nav-pill cursor-pointer w-full"
                v-for="(tab, index) in sideTabs"
                @click="onClickTab(tab)"
                :key="`tab-${index}`"
              >
                <Buttons.Tab
                  :value="tab"
                  :isActive="NavStore.activeJobSeekerFunnelTab === tab"
                  :color="details?.background_color"
                />
              </div>
            </div>

            <template v-if="NavStore.activeJobSeekerFunnelTab === 'Basic Details'">
              <div class="mt-4">
                <div class="">
                  <p class="font-Inter text-sm font-semibold">Full Name</p>
                  <p class="font-Inter text-sm font-normal pt-2">Mahesh Verma</p>
                </div>
                <div class="pt-6">
                  <p class="font-Inter text-sm font-semibold">Email</p>
                  <p class="font-Inter text-sm font-normal pt-2">maheshverma@gmail.com</p>
                </div>
                <div class="pt-6">
                  <p class="font-Inter text-sm font-semibold">Current Location</p>
                  <p class="font-Inter text-sm font-normal pt-2">Mumbai</p>
                </div>
                <div class="pt-6">
                  <p class="font-Inter text-sm font-semibold">Gender</p>
                  <p class="font-Inter text-sm font-normal pt-2">NA</p>
                </div>
                <div class="pt-6">
                  <p class="font-Inter text-sm font-semibold">Date of Birth</p>
                  <p class="font-Inter text-sm font-normal pt-2">16 Mar, 1992</p>
                </div>
              </div>
            </template>

            <template v-if="NavStore.activeJobSeekerFunnelTab === 'Resume'">
              <div class="mt-4">
                <p class="font-Inter text-sm font-normal">No resume uploaded by jobseeker.</p>
              </div>
            </template>

            <template v-if="NavStore.activeJobSeekerFunnelTab === 'Comments'">
              <div class="mt-4 flex flex-col gap-6">
                <TextEditors.Funnel placeholder="What are your thoughts?" />
                <Inputs.CommentBox
                  v-for="(comment, index) in comments"
                  :key="`comment` + index"
                  :comment="comment"
                  @action="deleteComment(index)"
                />
              </div>
            </template>
          </div>
        </template>
      </EmployerFunnel>
    </template>
  </Modals.RightSideWindow>
</template>
