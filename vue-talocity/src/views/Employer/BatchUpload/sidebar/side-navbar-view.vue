<script setup>
import { Inputs, Buttons, Uploads, Modals } from '@talocityui/ui'
import { GreaterThan } from '@talocityui/icons'
import { ref, watch, computed } from 'vue'
import { useJobsStore } from '@/stores/JobsStore'
import { useBatchStore } from '@/stores/BatchStore'
import { useAlertStore } from '@/stores/AlertStore'
import { useCompanyStore } from '@/stores/CompanyStore'

const JobsStore = useJobsStore()
const BatchStore = useBatchStore()
const AlertStore = useAlertStore()
const showTemplatesModal = ref(false)
const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)
const debounce = (func, delay) => {
  let timer
  return function (...params) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(...params)
    }, delay)
  }
}
const errors = ref({
  job: [],
  assessments: []
})
const batch_name = ref('')
const postBatchForm = ref(null)
const file = ref([])
// API functions to fetch job options
const job = ref([])
const jobOptions = ref([])
const jobSearchText = ref('')
const assessments = ref('')
const assessmentsOptions = ref([])

const jobOptionsFetch = async (searchText) => {
  if (searchText.trim().length > 1) {
    try {
      errors.value.job = []
      if (JobsStore.jobs?.length === 0) {
        await JobsStore.fetchJobs()
      }

      const json = JobsStore.jobs
        .filter((job) => job.title?.toLowerCase().search(searchText.toLowerCase()) >= 0)
        .map((job) => ({
          label: job.title,
          job_title: job.title,
          job_id: job._id
        }))
      if (json?.length === 0) {
        errors.value.job = [`No Option found matching "${searchText}"`]
      } else {
        jobOptions.value = json
      }
    } catch (err) {
      errors.value.job = [err]
    }
  } else {
    jobOptions.value = []
    errors.value.job = ['Type 2 or more characters to get options']
  }
}
const debouncedJobOptionsFetch = debounce((...params) => {
  jobOptionsFetch(params[0].value)
}, 300)
watch(jobSearchText, () => {
  debouncedJobOptionsFetch(jobSearchText)
})
const fetchAssessments = async (job) => {
  try {
    errors.value.assessments = []
    const res = await fetch(`http://52.66.224.33:9000/api/fetch/?id=${job.job_id}`)
    const json = await res.json()
    assessmentsOptions.value = json?.map((elem) => ({
      label: elem.assessment_name,
      id: elem._id
    }))
  } catch (err) {
    errors.value.assessments = [err]
  }
}
watch(job, (newJob) => {
  assessments.value = ''
  if (Object.keys(newJob)?.length > 0) {
    errors.value.job = []
    fetchAssessments(newJob)
  }
})

const postBatch = async () => {
  if (Object.keys(job.value)?.length === 0) {
    errors.value.job = ['Please select a Job']
    return
  }
  if (Object.keys(assessments.value)?.length === 0) {
    errors.value.assessments = ['Please select an Assessment']
    return
  }
  if (batch_name.value === '') {
    errors.value.batch = ['Please Enter a Batch Name']
    return
  }
  if (file.value.length == 0) {
    errors.value.file = ['Please Select a File to continue']
    return
  }

  const fd = new FormData()
  fd.append('job_id', job.value.job_id),
    fd.append('job_title', job.value.job_title),
    fd.append('job_assessment_id', assessments.value.id),
    fd.append('batch_name', batch_name.value),
    fd.append('uploaded_by', 'Frontend'),
    fd.append('uploaded_by_id', '54646546464444'),
    fd.append('file', file.value[0], 'batch_upload.csv')
  const res = await BatchStore.postBatch(fd)
  AlertStore.showAlert(res.data.message, 5000)
}
</script>
<template>
  <Modals.TemplateDownload v-model:show="showTemplatesModal" header="Download Template for:">
    <template #button>
      <div class="flex flex-col gap-3">
        <Buttons.Primary
          :bgColor="details?.background_color"
          :textColor="details?.text_color"
          value="Both Email and Phone Number"
          class="font-Inter font-light text-sm"
        />
        <Buttons.Primary
          :bgColor="details?.background_color"
          :textColor="details?.text_color"
          value="Only Phone Number"
          class="font-Inter font-light text-sm"
        />
      </div>
    </template>
  </Modals.TemplateDownload>
  <p class="font-inter font-medium text-base leading-6 mb-4">Upload a Batch</p>
  <form @submit.prevent="postBatch" class="flex flex-col gap-5 font-Inter" ref="postBatchForm">
    <Inputs.DropDown
      label="Job Title"
      :choices="jobOptions"
      v-model:selected="job"
      v-model:searchText="jobSearchText"
      :required="true"
      :filterOptions="false"
      :errors="errors.job"
      placeholder="Type to search..."
      :color="details?.background_color"
    />
    <Inputs.DropDown
      label="Start Assessments from"
      :color="details?.background_color"
      :choices="assessmentsOptions"
      v-model:selected="assessments"
      :required="true"
      filterOptions
      :errors="errors.assessments"
      :placeholder="
        Object.keys(job)?.length > 0 ? `Type to search...` : `Select a job to select assessment..`
      "
    />
    <Inputs.TextField
      required
      label="Batch Name"
      v-model:value="batch_name"
      :errors="errors.batch"
      :color="details?.background_color"
    />
    <div class="upload-wrapper flex flex-col">
      <div class="upload-header flex justify-between mb-1">
        <p class="font-normal text-sm">Upload File</p>
        <p
          @click="showTemplatesModal = true"
          class="font-medium text-xs cursor-pointer flex gap-1 justify-center items-center"
          :style="{ color: details?.background_color }"
        >
          Download Template
          <GreaterThan :color="details?.background_color" />
        </p>
      </div>
      <Uploads.DragAndDrop
        v-model:file="file"
        :accept="['.xls', '.csv']"
        :textColor="details?.background_color"
      />
    </div>
    <Buttons.Primary
      value="Upload Batch"
      type="submit"
      :textColor="details?.text_color"
      :bgColor="details?.background_color"
    />
  </form>
</template>
