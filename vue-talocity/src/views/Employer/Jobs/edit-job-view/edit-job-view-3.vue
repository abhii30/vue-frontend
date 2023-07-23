<script setup>
import { EditJob } from '@/layouts'
import { Inputs, Buttons } from '@talocityui/ui'
import { ref, computed } from 'vue'
// import { onBeforeRouteLeave } from 'vue-router'
import { useJobsStore } from '@/stores/JobsStore'
import { useNavStore } from '@/stores/NavStore'
import { useCompanyStore } from '@/stores/CompanyStore'

const NavStore = useNavStore()
NavStore.activeJobScreen = 3
const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)
const JobsStore = useJobsStore()

let UnpublishAfter = ref(false),
  UnpublishAfterDate = ref(''),
  UnpublishAfterTime = ref(''),
  ReApplyAfter = ref(false),
  Proctoring = ref(false),
  EmailNotifications = ref(false),
  SMSNotifications = ref(false),
  IVRNotifications = ref(false)
</script>
<template>
  <EditJob>
    <template #number> 3/5 </template>
    <template #job-action-buttons>
      <Buttons.Secondary value="Save Draft" textColorClass="base-color" @click="saveDraft" />
    </template>
    <template #main-content>
      <div class="flex flex-col gap-6 font-Inter text-sm font-normal">
        <div class="flex justify-between h-7">
          <p>Unpublish after</p>
          <Buttons.ToggleSwitch
            v-model:isChecked="UnpublishAfter"
            :color="details?.background_color"
          />
        </div>
        <div v-if="UnpublishAfter" class="flex flex-row gap-3 mt-[-12px]">
          <div class="flex relative w-full">
            <input
              type="text"
              v-model="UnpublishAfterDate"
              class="border rounded-lg h-9 w-full focus:outline-1 focus:outline-talocity-blue-color pl-9"
              disabled
            />
            <div class="absolute h-9 left-3 flex items-center">
              <Inputs.DatePicker v-model:dateUploaded="UnpublishAfterDate" />
            </div>
          </div>
          <div class="flex relative w-full">
            <input
              type="text"
              v-model="UnpublishAfterTime"
              class="border rounded-lg h-9 w-full focus:outline-1 focus:outline-talocity-blue-color pl-16"
              disabled
            />
            <div class="absolute h-9 flex items-center left-3">
              <Inputs.TimePicker
                v-model:timeUploaded="UnpublishAfterTime"
                :color="details?.background_color"
              />
              <div class="text-disabled-color mx-1">IST</div>
            </div>
          </div>
        </div>
        <div class="flex justify-between h-7">
          <p>Re-apply after</p>
          <Buttons.ToggleSwitch
            v-model:isChecked="ReApplyAfter"
            :color="details?.background_color"
          />
        </div>
        <div v-if="ReApplyAfter" class="flex flex-row gap-3 mt-[-12px]">
          <div class="flex relative w-full">
            <input
              type="number"
              :value="UnpublishAfterDate"
              class="border rounded-lg h-9 w-full focus:outline-1 px-4"
              :style="{ outlineColor: details?.background_color }"
            />
            <div class="absolute h-9 flex right-3 justify-end items-center text-disabled-color">
              Days
            </div>
          </div>
        </div>
        <div class="flex justify-between h-7">
          <p>Proctoring</p>
          <Buttons.ToggleSwitch v-model:isChecked="Proctoring" :color="details?.background_color" />
        </div>
        <div class="h-7 font-semibold">Notification Settings</div>
        <div class="flex justify-between h-7">
          <p>Email notifications</p>
          <Buttons.ToggleSwitch
            v-model:isChecked="EmailNotifications"
            :color="details?.background_color"
          />
        </div>
        <div class="flex justify-between h-7">
          <p>SMS notifications</p>
          <Buttons.ToggleSwitch
            v-model:isChecked="SMSNotifications"
            :color="details?.background_color"
          />
        </div>
        <div class="flex justify-between h-7">
          <p>IVR notifications</p>
          <Buttons.ToggleSwitch
            v-model:isChecked="IVRNotifications"
            :color="details?.background_color"
          />
        </div>
      </div>
    </template>
  </EditJob>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
