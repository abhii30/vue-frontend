<script setup>
import { CreateJob } from '@/layouts'
import { Inputs, Buttons } from '@talocityui/ui'
import { ref, computed, watch } from 'vue'
// import { onBeforeRouteLeave } from 'vue-router'
import { useJobsStore } from '@/stores/JobsStore'
import { useNavStore } from '@/stores/NavStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { useAlertStore } from '@/stores/AlertStore'
import { useRouter } from 'vue-router'

const AlertStore = useAlertStore()
const router = useRouter()
const NavStore = useNavStore()
NavStore.activeJobScreen = 3
const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)
const JobsStore = useJobsStore()

const formattedDate = (jobDate) => {
  const dateFormat = (date) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
    const [month, day, year] = date.toLocaleDateString('en-US', options).split(' ')
    return `${day.replace(',', '')} ${month}, ${year}`
  }
  if (!jobDate) {
    return dateFormat(new Date());
  } else{
    return dateFormat(new Date(jobDate));
  }
}

const formattedTime = (jobDate) => {
  if(!jobDate){
    return new Date().toLocaleTimeString('en-US',{timeZone:"IST",hour: '2-digit', minute:'2-digit'})
  }
  return new Date(jobDate).toLocaleTimeString('en-US',{timeZone:"IST",hour: '2-digit', minute:'2-digit'})
}


let unpublish_after_enable = ref(JobsStore.createdTempJob?.unpublish_after?.enabled),
  unpublish_after_date = ref(formattedDate(JobsStore.createdTempJob?.unpublish_after?.value)),
  unpublish_after_time = ref(formattedTime(JobsStore.createdTempJob?.unpublish_after?.value)),
  reapply_enable = ref(JobsStore.createdTempJob?.reapply?.enabled),
  reapply_value = ref(JobsStore.createdTempJob?.reapply?.value || 1),
  proctoring = ref(JobsStore.createdTempJob?.proctoring),
  email_notifications = ref(JobsStore.createdTempJob?.email_notifications),
  sms_notifications = ref(JobsStore.createdTempJob?.sms_notifications),
  ivr_notifications = ref(JobsStore.createdTempJob?.ivr_notifications)

const errors = ref({
  title: [],
  location:[]
})
const saveDraft = () => {
  if (!JobsStore.createdTempJob.title || JobsStore.createdTempJob.title.trim() === '') {
    errors.value.title = ["You can't Save Draft with an Empty Title."]
  } else {
    errors.value.title = []
  }
  if (!JobsStore.createdTempJob.location || JobsStore.createdTempJob.location.length === 0) {
    errors.value.location = ["You can't Save Draft with no Location Selected."]
  } else {
    errors.value.location = []
  }
  if (
    JobsStore.createdTempJob.title &&
    JobsStore.createdTempJob.title.trim() !== '' &&
    JobsStore.createdTempJob.location.length > 0
  ) {
    postJob()
  }
}

const postJob = async () => {
  JobsStore.createdTempJob.status = 'Drafts'
  const res = await JobsStore.postJob(JobsStore.createdTempJob)

  if (res?.id) {
    AlertStore.showAlert(res?.message, 5000)
    JobsStore.activeJob = JobsStore.createdTempJob
    JobsStore.createdTempJob = {}
    router.push({ name: 'employerEditJob-2', params: { id: res.id } })
  }
}
  watch(
  [
    unpublish_after_enable,
    unpublish_after_date,
    unpublish_after_time,
    reapply_enable,
    reapply_value,
    proctoring,
    email_notifications,
    sms_notifications,
    ivr_notifications
  ],
  () => {
    JobsStore.createdTempJob = {
      ...JobsStore.createdTempJob,
      unpublish_after:{
        enabled:unpublish_after_enable.value,
        value: new Date(unpublish_after_date.value +" "+ unpublish_after_time.value)
      },
      reapply:{
        enabled:reapply_enable.value,
        value:reapply_value.value
      },
      proctoring:proctoring.value,
      email_notifications:email_notifications.value,
      sms_notifications:sms_notifications.value,
      ivr_notifications:ivr_notifications.value
    }
  }
)

</script>
<template>
  <CreateJob>
    <template #number> 3/5 </template>
    <template #job-action-buttons>
      <Buttons.Secondary value="Save Draft" textColorClass="base-color" @click="saveDraft" />
    </template>
    <template #main-content>
      <div class="flex flex-col gap-6 font-Inter text-sm font-normal">
        <div class="flex justify-between h-7">
          <p>Unpublish after</p>
          <Buttons.ToggleSwitch
            v-model:isChecked="unpublish_after_enable"
            :color="details?.background_color"
          />
        </div>
        <div v-if="unpublish_after_enable" class="flex flex-row gap-3 mt-[-12px]">
          <div class="flex relative w-full">
            <input
              type="text"
              v-model="unpublish_after_date"
              class="border rounded-lg h-9 w-full focus:outline-1 focus:outline-talocity-blue-color pl-9"
              disabled
            />
            <div class="absolute h-9 left-3 flex items-center">
              <Inputs.DatePicker v-model:dateUploaded="unpublish_after_date" :min="new Date().toISOString().split('T')[0]"/>
            </div>
          </div>
          <div class="flex relative w-full">
            <input
              type="text"
              v-model="unpublish_after_time"
              class="border rounded-lg h-9 w-full focus:outline-1 focus:outline-talocity-blue-color pl-16"
              disabled
            />
            <div class="absolute h-9 flex items-center left-3">
              <Inputs.TimePicker
                v-model:timeUploaded="unpublish_after_time"
                :color="details?.background_color"
              />
              <div class="text-disabled-color mx-1">IST</div>
            </div>
          </div>
        </div>
        <div class="flex justify-between h-7">
          <p>Re-apply after</p>
          <Buttons.ToggleSwitch
            v-model:isChecked="reapply_enable"
            :color="details?.background_color"
          />
        </div>
        <div v-if="reapply_enable" class="flex flex-row gap-3">
          <div class="flex relative w-full">
            <input
              type="number"
              v-model="reapply_value"
              class="border rounded-lg h-9 w-full focus:outline-1 px-4"
              :style="{ outlineColor: details?.background_color }"
            />
            <div class="absolute h-9 flex right-3 justify-end items-center text-disabled-color">
              Days
            </div>
          </div>
        </div>
        <div class="flex justify-between h-7">
          <p>proctoring</p>
          <Buttons.ToggleSwitch v-model:isChecked="proctoring" :color="details?.background_color" />
        </div>
        <div class="h-7 font-semibold">Notification Settings</div>
        <div class="flex justify-between h-7">
          <p>Email notifications</p>
          <Buttons.ToggleSwitch
            v-model:isChecked="email_notifications"
            :color="details?.background_color"
          />
        </div>
        <div class="flex justify-between h-7">
          <p>SMS notifications</p>
          <Buttons.ToggleSwitch
            v-model:isChecked="sms_notifications"
            :color="details?.background_color"
          />
        </div>
        <div class="flex justify-between h-7">
          <p>IVR notifications</p>
          <Buttons.ToggleSwitch
            v-model:isChecked="ivr_notifications"
            :color="details?.background_color"
          />
        </div>
      </div>
    </template>
  </CreateJob>
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
