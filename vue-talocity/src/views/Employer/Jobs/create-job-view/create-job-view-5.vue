<script setup>
import { CreateJob } from '@/layouts'
import { ref, computed } from 'vue'
import { Buttons, Modals } from '@talocityui/ui'
import { AssessmentConfig } from '@talocityui/wrappers'

import { useJobsStore } from '@/stores/JobsStore'
import { useNavStore } from '@/stores/NavStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { helpers } from '@talocityui/theme'

const NavStore = useNavStore()
NavStore.activeJobScreen = 5
const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)
const fadedColor = computed(() => helpers.fadeColor(details.value?.background_color, '0.08'))
const JobsStore = useJobsStore()

const isScreening = ref(true)
const isDomain = ref(false)
const isTyping = ref(true)
const isVoice = ref(false)
const isOneWayVideo = ref(false)
const showAssessmentLocked = ref(false)
</script>
<template>
  <Modals.TemplateDownload
    v-model:show="showAssessmentLocked"
    header="Assessment(s) Locked"
    body="Contact super-admin for more information"
  >
    <template #button>
      <div class="flex flex-col gap-3">
        <Buttons.Primary
          :bgColor="details?.background_color"
          value="Contact Super-Admin"
          class="font-Inter font-light text-sm"
        />
        <Buttons.Primary
          @click="
            () => {
              showAssessmentLocked = !showAssessmentLocked
            }
          "
          bgColor="primary-color"
          textColor="black"
          value="Cancel"
          class="font-Inter font-light text-sm"
        />
      </div>
    </template>
  </Modals.TemplateDownload>
  <CreateJob>
    <template #number> 5/5 </template>
    <template #job-action-buttons>
      <Buttons.Secondary value="Save Draft" textColorClass="base-color" @click="saveDraft" />
    </template>
    <template #main-content>
      <div class="flex flex-col gap-1 mb-3 mt-1.5">
        <div class="font-Inter text-sm leading-5 font-normal">Type of assessments needed</div>
        <div class="font-Inter text-xs leading-5 font-normal text-primary-color">
          These can be changed or updated in Assessments as well.
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <AssessmentConfig
          assessmentType="Screening"
          v-model:toggleValue="isScreening"
          :color="details?.background_color"
        ></AssessmentConfig>
        <AssessmentConfig
          assessmentType="Domain"
          v-model:toggleValue="isDomain"
          :color="details?.background_color"
        ></AssessmentConfig>
        <AssessmentConfig
          assessmentType="One-Way Video"
          v-model:toggleValue="isOneWayVideo"
          :color="details?.background_color"
        ></AssessmentConfig>
        <AssessmentConfig
          assessmentType="Typing"
          v-model:toggleValue="isTyping"
          :color="details?.background_color"
        ></AssessmentConfig>
        <AssessmentConfig
          assessmentType="Voice (English)"
          v-model:toggleValue="isVoice"
          :locked="true"
          v-model:lockedValue="showAssessmentLocked"
          :color="details?.background_color"
        ></AssessmentConfig>
      </div>
    </template>
  </CreateJob>
</template>

<style scoped>
.table-head {
  color: #001325 !important;
}
</style>
