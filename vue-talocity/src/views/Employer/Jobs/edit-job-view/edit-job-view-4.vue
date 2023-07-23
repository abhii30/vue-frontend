<script setup>
import { EditJob } from '@/layouts'
import { ref, computed } from 'vue'
import { colors } from '@talocityui/theme'
import { AddIcon } from '@talocityui/icons'
import { Inputs } from '@talocityui/ui'
import { JobsSetting, AddSetting } from '@talocityui/wrappers'

import { useJobsStore } from '@/stores/JobsStore'
import { useNavStore } from '@/stores/NavStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import {helpers} from '@talocityui/theme'

const NavStore = useNavStore()
NavStore.activeJobScreen = 4
const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)
const fadedColor = computed(()=> helpers.fadeColor(details.value?.background_color, '0.08'))
const JobsStore = useJobsStore()
const newSettings = ref([])
const fieldValues = ref([])
const name = ref({
  fieldName: 'Name',
  enable: true,
  mandatory: true,
  fieldValue: 'Free Text'
})
const email = ref({
  fieldName: 'Email Address',
  enable: false,
  mandatory: false,
  fieldValue: 'Free Text'
})
const referenceSource = ref({
  fieldName: 'Reference Source',
  enable: false,
  mandatory: false,
  fieldValue: []
})
const referenceId = ref({
  fieldName: 'Reference Source ID',
  enable: false,
  mandatory: false,
  fieldValue: 'Free Text'
})
const photoId = ref({
  fieldName: 'Valid Photo ID',
  enable: false,
  mandatory: false,
  fieldValue: 'Free Text'
})
const city = ref({
  fieldName: 'Current City',
  enable: false,
  mandatory: false,
  fieldValue: 'City Names'
})
const storeCode = ref({
  fieldName: 'Store Code',
  enable: false,
  mandatory: false,
  fieldValue: 'Free Text'
})
const storeName = ref({
  fieldName: 'Store Name',
  enable: false,
  mandatory: false,
  fieldValue: 'Text Only'
})
const resume = ref({
  fieldName: 'Resume',
  enable: false,
  mandatory: false,
  fieldValue: 'File(.pdf, .docx, .jpg)'
})

const addNewSetting = () => {
  newSettings.value.push(JobsSetting)
  fieldValues.value.push({
    fieldName: '',
    enable: false,
    mandatory: false,
    fieldValue: 'Free Text'
  })
}

const removeNewSetting = (index) => {
  newSettings.value.splice(index, 1)
  fieldValues.value.splice(index, 1)
}

</script>
<template>
  <EditJob>
    <template #number> 4/5 </template>
    <template #job-action-buttons>
      <Buttons.Secondary value="Save Draft" textColorClass="base-color" @click="saveDraft" />
    </template>
    <template #main-content>
      <div class="mt-5 flex flex-col">
        <div class="phone-verification" :style="{backgroundColor:fadedColor}">
          <p class="font-Inter font-normal text-xs leading-5 text-center py-1.5">Phone number will be verified via OTP</p>
        </div>
        <v-table class="font-Inter text-sm text-base-color font-medium">
          <thead>
            <tr>
              <th class="table-head">Field Name</th>
              <th class="table-head">Enable</th>
              <th class="table-head">Mandatory</th>
              <th class="table-head">Values</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <JobsSetting
              :fieldName="name.fieldName"
              v-model:enable="name.enable"
              v-model:mandatory="name.mandatory"
              :fieldValue="name.fieldValue"
              :isDisabled="true"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :fieldName="email.fieldName"
              v-model:enable="email.enable"
              v-model:mandatory="email.mandatory"
              :fieldValue="email.fieldValue"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :fieldName="referenceSource.fieldName"
              v-model:enable="referenceSource.enable"
              v-model:mandatory="referenceSource.mandatory"
              :bgColor="details?.background_color"
              other="true"
              ><template #component
                ><Inputs.MultiValue
                  label="Sources"
                  :color="details?.background_color"
                  v-model:value="referenceSource.fieldValue" /></template
            ></JobsSetting>
            <JobsSetting
              :fieldName="referenceId.fieldName"
              v-model:enable="referenceId.enable"
              v-model:mandatory="referenceId.mandatory"
              :fieldValue="referenceId.fieldValue"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :fieldName="photoId.fieldName"
              v-model:enable="photoId.enable"
              v-model:mandatory="photoId.mandatory"
              :fieldValue="photoId.fieldValue"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :fieldName="city.fieldName"
              v-model:enable="city.enable"
              v-model:mandatory="city.mandatory"
              :fieldValue="city.fieldValue"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :fieldName="storeCode.fieldName"
              v-model:enable="storeCode.enable"
              v-model:mandatory="storeCode.mandatory"
              :fieldValue="storeCode.fieldValue"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :fieldName="storeName.fieldName"
              v-model:enable="storeName.enable"
              v-model:mandatory="storeName.mandatory"
              :fieldValue="storeName.fieldValue"
              :bgColor="details?.background_color"
            />
            <JobsSetting
              :fieldName="resume.fieldName"
              v-model:enable="resume.enable"
              v-model:mandatory="resume.mandatory"
              :fieldValue="resume.fieldValue"
              :bgColor="details?.background_color"
            />
            <AddSetting
              v-for="(setting, index) in newSettings"
              :key="index"
              v-model:fieldValues="fieldValues[index]"
              @action="removeNewSetting(index)"
              :bgColor="details?.background_color"
            />
          </tbody>
          <button
            @click="addNewSetting"
            class="mt-1 w-max text-sm flex h-7 items-center gap-0.5"
            :style="{color: newSettings.length === 2 ? `#A3AAB0 ` : details?.background_color}"
            :disabled="newSettings.length === 2"
          >
            <AddIcon :color="newSettings.length == 2 ? '#A3AAB0' : details?.background_color" /> 
              Add Field
            <span class="text-sm text-disabled-color ml-1"> ({{ newSettings.length }}/2) </span>  
          </button>
        </v-table>
      </div>
    </template>
  </EditJob>
</template>

<style scoped>
.table-head {
  color: #001325 !important;
}
</style>
