<script setup>
import { EditJob } from '@/layouts'
import { Inputs, CheckBoxes, Modals, Buttons } from '@talocityui/ui'
import { ref, computed, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/JobsStore'
import { useNavStore } from '@/stores/NavStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { useAlertStore } from '@/stores/AlertStore'

const AlertStore = useAlertStore()

const NavStore = useNavStore()
NavStore.activeJobScreen = 1

const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)

const JobsStore = useJobsStore()
const job = computed(() => JobsStore.activeJob)
const router = useRouter()

const errors = ref({
  title: [],
  location: [],
  industry: [],
  department: []
})

let title = ref(job?.value.title),
  department = ref(job?.value.department),
  industry = ref(job?.value.industry),
  visibility = ref(job?.value.visibility),
  location = ref(job?.value.location),
  remotePolicy = ref(job?.value.remote_policy),
  wfh = ref(job?.value.wfh_flexibility),
  autoSkip = ref(job?.value.auto_skip_relocation)

const saveDraft = () => {
  if (!title.value || title.value.trim() === '') {
    errors.value.title = ["You can't Save Draft with an Empty Title."]
  } else {
    errors.value.title = []
  }
  if (!location.value || location.value.length === 0) {
    errors.value.location = ["You can't Save Draft with no Location Selected."]
  } else {
    errors.value.location = []
  }
  if (title.value && title.value.trim() !== '' && location.value.length > 0) {
    const newJob = {
      ...job.value,
      title: title.value,
      department: department.value,
      industry: industry.value,
      visibility: visibility.value,
      location: location.value,
      wfh_flexibility: wfh.value,
      auto_skip_relocation: autoSkip.value,
      remote_policy: remotePolicy.value,
      status: 'Drafts'
    }
    putJob(newJob)
  }
}

const putJob = async (newJob) => {
  const res = await JobsStore.putJob(newJob)
  AlertStore.showAlert(res?.message, 5000)

  if (job.value.id) {
    JobsStore.createdTempJob = {}
    router.push({ name: 'employerEditJob-1', params: { id: job.value.id } })
  }
}

let remotePolicyOptions = [
  { label: 'Onsite', value: 'Onsite' },
  { label: 'Hybrid', value: 'Hybrid' },
  { label: 'Remote', value: 'Remote' }
]
let visibilityOptions = [
  { label: 'Public', value: 'Public' },
  { label: 'Private (Invite Only)', value: 'Private' }
]
let departmentSearchText = ref('')
let departmentOptions = ref([])
let industrySearchText = ref('')
let industryOptions = ref([])
const locationSearchText = ref('')
const locationOptions = ref(['New Delhi', 'Bengaluru'])

//watchers to update errors
watch(location, () => {
  if (location.value?.length > 0) {
    errors.value.location = []
  }
})
watch(title, () => {
  if (title.value && title.value.trim() !== '') {
    errors.value.title = []
  }
})

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

// API functions to fetch department options
const departmentOptionsFetch = async (searchText) => {
  if (searchText.trim().length > 1) {
    try {
      errors.value.department = []
      const res = await fetch(
        `http://52.66.224.33:8000/api/fetchOptions/functional/?search=${searchText}`
      )
      const json = await res.json()
      departmentOptions.value = json.results
      if (json?.results?.length === 0) {
        errors.value.department = [`No Option found matching "${searchText}"`]
      }
    } catch (err) {
      errors.value.department = [err]
    }
  } else {
    departmentOptions.value = []
    errors.value.department = ['Type 2 or more characters to get options']
  }
}
const debouncedDepartmentOptionsFetch = debounce((...params) => {
  departmentOptionsFetch(params[0].value)
}, 300)
watch(departmentSearchText, () => {
  debouncedDepartmentOptionsFetch(departmentSearchText)
})

// API functions to fetch industry options
const industryOptionsFetch = async (searchText) => {
  if (searchText.trim().length > 1) {
    try {
      errors.value.industry = []
      const res = await fetch(
        `http://52.66.224.33:8000/api/fetchOptions/industry/?search=${searchText}`
      )
      const json = await res.json()
      industryOptions.value = json.results
      if (json?.results?.length === 0) {
        errors.value.industry = [`No option found matching "${searchText}"`]
      }
    } catch (err) {
      errors.value.industry = [err]
    }
  } else {
    industryOptions.value = []
    errors.value.industry = ['Type 2 or more characters to get options']
  }
}
const debouncedIndustryOptionsFetch = debounce((...params) => {
  industryOptionsFetch(params[0].value)
}, 300)
watch(industrySearchText, () => {
  debouncedIndustryOptionsFetch(industrySearchText)
})
watch(job, () => {
  ;(title.value = job?.value.title),
    (department.value = job?.value.department),
    (industry.value = job?.value.industry),
    (visibility.value = job?.value.visibility),
    (location.value = job?.value.location),
    (remotePolicy.value = job?.value.remote_policy),
    (wfh.value = job?.value.wfh_flexibility),
    (autoSkip.value = job?.value.auto_skip_relocation)
})
</script>
<template>
  <!-- <Modals.AreYouSure
      :open="showPrompt"
      @close="showPrompt=false"
      @confirm="moveAhead=true"
    /> -->
  <EditJob>
    <template #number> 1/2 </template>
    <template #job-action-buttons>
      <Buttons.Secondary value="Save Draft" textColorClass="base-color" @click="saveDraft" />
    </template>
    <template #main-content>
      <div class="edit-job-content-body flex flex-col gap-6">
        <Inputs.TextField
          placeholder="e.g. Software Engineer, Product Designer etc."
          label="Job Title"
          :required="true"
          :requiredError="false"
          v-model:value="title"
          :checkError="true"
          :errors="errors.title"
          :color="details?.background_color"
        />
        <Inputs.DropDown
          label="Type of Function/ Department"
          :choices="departmentOptions"
          v-model:selected="department"
          v-model:searchText="departmentSearchText"
          :required="true"
          :filterOptions="false"
          :errors="errors.department"
          placeholder="Type to search..."
          :color="details?.background_color"
        />
        <Inputs.DropDown
          label="Type of Industry"
          :choices="industryOptions"
          v-model:selected="industry"
          v-model:searchText="industrySearchText"
          :required="true"
          :filterOptions="false"
          :errors="errors.industry"
          placeholder="Type to search..."
          :color="details?.background_color"
        />
        <Inputs.MultiSelect
          label="Office Location"
          placeholder="Where are you hiring for this role?"
          :options="locationOptions"
          v-model:selectedArray="location"
          v-model:searchText="locationSearchText"
          :required="true"
          :requiredError="false"
          :errors="errors.location"
          :icon="true"
          :color="details?.background_color"
        >
          <template #icon>
            <Search />
          </template>
        </Inputs.MultiSelect>
        <Inputs.RadioSelect
          label="Job Visibility"
          :options="visibilityOptions"
          v-model="visibility"
          :required="true"
          :color = "details?.background_color"
        />
        <Inputs.RadioSelect
          label="What's your remote policy for this job?"
          :options="remotePolicyOptions"
          v-model="remotePolicy"
          :required="true"
          :color = "details?.background_color"
        />
        <CheckBoxes.Default
          id="wfh"
          v-model="wfh"
          label="WFH flexibility - Employees may work from home a few days a week"
          :isDisabled="remotePolicy === 'Remote' ? true : false"
          :isChecked="wfh"
          :color="details?.background_color"
        />
        <CheckBoxes.Default
          id="auto-skip"
          v-model="autoSkip"
          label="Auto-skip applicants who cannot relocate for this position"
          :isDisabled="remotePolicy === 'Remote' ? true : false"
          :isChecked="autoSkip"
          :color="details?.background_color"
        />
      </div>
    </template>
  </EditJob>
</template>
