<script setup>
import { CreateJob } from '@/layouts'
import { ref, computed, watch, onMounted } from 'vue'
import { AddIcon } from '@talocityui/icons'
import { Inputs, Modals, Buttons } from '@talocityui/ui'
import { JobsSetting, AddSetting } from '@talocityui/wrappers'

import { useJobsStore } from '@/stores/JobsStore'
import { useNavStore } from '@/stores/NavStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { helpers } from '@talocityui/theme'

const NavStore = useNavStore()
NavStore.activeJobScreen = 4
const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)
const fadedColor = computed(() => helpers.fadeColor(details.value?.background_color, '0.08'))
const JobsStore = useJobsStore()
const fieldValues = ref(JobsStore.createdTempJob?.crc?.custom)
const showFieldLocked = ref(false)
const name = ref(JobsStore.createdTempJob?.crc?.compulsory[0] ||{
  title: 'Name',
  enable: true,
  mandatory: true,
  sources: 'Free Text'
})
const email = ref(JobsStore.createdTempJob?.crc?.compulsory[1] ||{
  title: 'Email Address',
  enable: false,
  mandatory: false,
  sources: 'Free Text'
})
const referenceSource = ref(JobsStore.createdTempJob?.crc?.compulsory[2] ||{
  title: 'Reference Source',
  enable: false,
  mandatory: false,
  sources: []
})
const referenceId = ref(JobsStore.createdTempJob?.crc?.compulsory[3] ||{
  title: 'Employee Reference ID',
  enable: false,
  mandatory: false,
  sources: 'Free Text'
})
const photoId = ref(JobsStore.createdTempJob?.crc?.compulsory[4] ||{
  title: 'Valid Photo ID',
  enable: false,
  mandatory: false,
  sources: 'Free Text'
})
const city = ref(JobsStore.createdTempJob?.crc?.compulsory[5] ||{
  title: 'Current City',
  enable: false,
  mandatory: false,
  sources: 'City Names'
})
const storeCode = ref(JobsStore.createdTempJob?.crc?.compulsory[6] ||{
  title: 'Store Code',
  enable: false,
  mandatory: false,
  sources: 'Free Text'
})
const storeName = ref(JobsStore.createdTempJob?.crc?.compulsory[7] ||{
  title: 'Store Name',
  enable: false,
  mandatory: false,
  sources: 'Text Only'
})
const resume = ref(JobsStore.createdTempJob?.crc?.compulsory[8] ||{
  title: 'Resume',
  enable: false,
  mandatory: false,
  sources: 'File(.pdf, .docx, .jpg)'
})

const crc = computed(()=>({
  compulsory:[
    name,
    email,
    referenceSource,
    referenceId,
    city,
    photoId,
    storeCode,
    storeName,
    resume,
  ],
  custom:fieldValues.value
}))

const addNewSetting = () => {
  fieldValues.value.push({
    title: '',
    enable: false,
    mandatory: false,
    input: 'Free Text'
  })
}

const removeNewSetting = (index) => {
  fieldValues.value.splice(index, 1)
}

watch([crc],()=>{
  JobsStore.createdTempJob={
    ...JobsStore.createdTempJob,
    crc:crc.value
  }
})

onMounted(() => {
  JobsStore.createdTempJob={
    ...JobsStore.createdTempJob,
    crc:crc.value
  }
})

</script>
<template>
  <Modals.TemplateDownload
    v-model:show="showFieldLocked"
    header="Field Locked"
    body="Name field cannot be disabled or marked as optional"
  >
    <template #button>
      <div class="flex flex-col gap-3">
        <Buttons.Primary
          :bgColor="details?.background_color"
          value="Okay"
          class="font-Inter font-light text-sm"
          @click="
            () => {
              showFieldLocked = !showFieldLocked
            }
          "
        />
      </div>
    </template>
  </Modals.TemplateDownload>
  <CreateJob>
    <template #number> 4/5 </template>
    <template #job-action-buttons>
      <Buttons.Secondary value="Save Draft" textColorClass="base-color" @click="saveDraft" />
    </template>
    <template #main-content>
      {{ fieldValues }}
      <div class="mt-5 flex flex-col">
        <div class="phone-verification" :style="{ backgroundColor: fadedColor }">
          <p class="font-Inter font-normal text-xs leading-5 text-center py-1.5">
            Phone number will be verified via OTP
          </p>
        </div>
        <v-table class="font-Inter text-sm text-base-color font-medium">
          <thead>
            <tr>
              <th class="table-head w-[12.5%]">Field Name</th>
              <th class="table-head w-[12.5%]">Enable</th>
              <th class="table-head w-[12.5%]">Mandatory</th>
              <th class="table-head w-1/2">Values</th>
              <th class=" w-[10.5%]"></th>
            </tr>
          </thead>
          <tbody>
            <JobsSetting
              :title="name.title"
              v-model:enable="name.enable"
              v-model:mandatory="name.mandatory"
              :sources="name.sources"
              :isDisabled="true"
              :bgColor="details?.background_color"
              v-model:show="showFieldLocked"
            />
            <JobsSetting
              :title="email.title"
              v-model:enable="email.enable"
              v-model:mandatory="email.mandatory"
              :sources="email.sources"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :title="referenceSource.title"
              v-model:enable="referenceSource.enable"
              v-model:mandatory="referenceSource.mandatory"
              :bgColor="details?.background_color"
              other="true"
              >
              <template #component>
                <Inputs.MultiValue
                  label="Sources"
                  :color="details?.background_color"
                  maxWidth="320px"
                  v-model:value="referenceSource.sources" />
              </template>
            </JobsSetting>
            <JobsSetting
              :title="referenceId.title"
              v-model:enable="referenceId.enable"
              v-model:mandatory="referenceId.mandatory"
              :sources="referenceId.sources"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :title="photoId.title"
              v-model:enable="photoId.enable"
              v-model:mandatory="photoId.mandatory"
              :sources="photoId.sources"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :title="city.title"
              v-model:enable="city.enable"
              v-model:mandatory="city.mandatory"
              :sources="city.sources"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :title="storeCode.title"
              v-model:enable="storeCode.enable"
              v-model:mandatory="storeCode.mandatory"
              :sources="storeCode.sources"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :title="storeName.title"
              v-model:enable="storeName.enable"
              v-model:mandatory="storeName.mandatory"
              :sources="storeName.sources"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :title="resume.title"
              v-model:enable="resume.enable"
              v-model:mandatory="resume.mandatory"
              :sources="resume.sources"
              :bgColor="details?.background_color"
            />
            <AddSetting
              v-for="(setting, index) in fieldValues"
              :key="'custom-setting-'+index"
              v-model:fieldValues="fieldValues[index]"
              @action="removeNewSetting(index)"
              :bgColor="details?.background_color"
              :fadedColor="fadedColor"
            />
          </tbody>
          <button
            @click="addNewSetting"
            class="mt-1 w-max text-sm flex h-7 items-center gap-0.5"
            :style="{ color: fieldValues.length === 2 ? `#A3AAB0 ` : details?.background_color }"
            :disabled="fieldValues.length === 2"
          >
            <AddIcon :color="fieldValues.length == 2 ? '#A3AAB0' : details?.background_color" />
            Add Field
            <span class="text-sm text-disabled-color ml-1"> ({{ fieldValues.length }}/2) </span>
          </button>
        </v-table>
      </div>
    </template>
  </CreateJob>
</template>

<style scoped>
.table-head {
  color: #001325 !important;
}
</style>
