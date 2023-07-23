<script setup>
import { CreateJob } from '@/layouts'
import { Inputs, CheckBoxes, Buttons } from '@talocityui/ui'
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/JobsStore'
import { useNavStore } from '@/stores/NavStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { Search } from '@talocityui/icons'
import { useAlertStore } from '@/stores/AlertStore'
const AlertStore = useAlertStore()

const NavStore = useNavStore()
NavStore.activeJobScreen = 1

const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)

const JobsStore = useJobsStore()
const router = useRouter()
const errors = ref({
  title: [],
  location: [],
  industry: [],
  department: []
})

let title = ref(JobsStore.createdTempJob?.title),
  department = ref(JobsStore.createdTempJob?.department),
  industry = ref(JobsStore.createdTempJob?.industry),
  visibility = ref(JobsStore.createdTempJob?.visibility),
  location = ref(JobsStore.createdTempJob?.location),
  remotePolicy = ref(JobsStore.createdTempJob?.remote_policy),
  wfh = ref(JobsStore.createdTempJob?.wfh_flexibility),
  autoSkip = ref(JobsStore.createdTempJob?.auto_skip_relocation)

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
    router.push({ name: 'employerEditJob-1', params: { id: res.id } })
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
// const showPrompt = ref(false)
// const moveAhead = ref(false)
// onBeforeRouteLeave((to, from)=> {
//   showPrompt.value = true;
//     return moveAhead;
// })
watch([visibility, autoSkip, remotePolicy, wfh], () => {
  JobsStore.createdTempJob = {
    ...JobsStore.createdTempJob,
    visibility: visibility.value,
    wfh_flexibility: wfh.value,
    auto_skip_relocation: autoSkip.value,
    remote_policy: remotePolicy.value
  }
})
const locationSearchText = ref('')
const locationOptions = ref(['New Delhi', 'Bengaluru'])
watch(location, () => {
  JobsStore.createdTempJob = {
    ...JobsStore.createdTempJob,
    location: location.value
  }
  if (location.value.length > 0) {
    errors.value.location = []
  }
})
watch(title, () => {
  JobsStore.createdTempJob = {
    ...JobsStore.createdTempJob,
    title: title.value
  }
  if (title.value && title.value.trim() !== '') {
    errors.value.title = []
  }
})
watch(industry, () => {
  JobsStore.createdTempJob = {
    ...JobsStore.createdTempJob,
    industry: industry.value
  }
})
watch(department, () => {
  JobsStore.createdTempJob = {
    ...JobsStore.createdTempJob,
    department: department.value
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
</script>
<template>
  <!-- <Modals.AreYouSure
      :open="showPrompt"
      @close="showPrompt=false"
      @confirm="moveAhead=true"
    /> -->
  <CreateJob>
    <template #number> 1/5 </template>
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
          label="Function/Department"
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
          label="Industry"
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
          label="Location"
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
          label="Remote policy"
          :options="remotePolicyOptions"
          v-model="remotePolicy"
          :required="true"
          :color="details?.background_color"

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
  </CreateJob>
</template>
