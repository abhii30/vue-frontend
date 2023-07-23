<script setup>
import { ref, watch, computed } from 'vue'
import { helpers } from '@talocityui/theme'
import { EditJob } from '@/layouts'
import { Inputs, TextEditors, Buttons, Uploads } from '@talocityui/ui'
import { useRouter } from 'vue-router'
import { useNavStore } from '@/stores/NavStore'
import { useJobsStore } from '@/stores/JobsStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { useAlertStore } from '@/stores/AlertStore'

const AlertStore = useAlertStore()

const NavStore = useNavStore()
NavStore.activeJobScreen = 2

const file = ref([])
const JdVideoLink = ref('')
const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)
const errors = ref({
  skills: []
})
const router = useRouter()
const JobsStore = useJobsStore()
const job = computed(() => JobsStore.activeJob)

let type_of_position = ref(job?.value.type_of_position),
  experience = ref(job?.value.experience),
  skills = ref(job?.value.skills),
  description = ref(job?.value.description),
  min_qualification = ref(job?.value.min_qualification),
  degrees = ref(job?.value.degrees),
  min_salary = ref(job?.value.min_salary),
  max_salary = ref(job?.value.max_salary),
  choices = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9'
  ]

const saveDraft = () => {
  if (!job.value.title || job.value.title.trim() === '') {
    errors.value.title = ["You can't Save Draft with an Empty Title."]
  } else {
    errors.value.title = []
  }
  if (!job.value.location || job.value.location?.length === 0) {
    errors.value.location = ["You can't Save Draft with no Location Selected."]
  } else {
    errors.value.location = []
  }
  if (job.value.title && job.value.title.trim() !== '' && job.value.location?.length > 0) {
    const newJob = {
      ...job.value,
      type_of_position: type_of_position.value,
      experience: experience.value,
      min_qualification: min_qualification.value,
      description: description.value,
      currency: currency.value,
      min_salary: +min_salary.value || '',
      max_salary: +max_salary.value || '',
      degrees: degrees.value,
      skills: skills.value,
      status: 'Drafts'
    }
    putJob(newJob)
  }
}

const putJob = async (newJob) => {
  const res = await JobsStore.putJob(newJob)
  console.log(res)
  AlertStore.showAlert(res?.message, 5000)

  if (job.value.id) {
    JobsStore.createdTempJob = {}
    router.push({ name: 'employerEditJob-1', params: { id: job.value.id } })
  }
}
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

//min_qualification

const minQualificationOptions = ['10th', '12th', 'Bachelors', 'Masters', 'PPG']

//currency
const currencyOptions = ref([
    {
      name: 'Indian National Rupee',
      symbol: '₹',
      label: `Indian National Rupee (₹)`,
      format: 'IN'
    },
    {
      name: 'United States Dollar',
      symbol: '$',
      label: `United States Dollar ($)`,
      format: 'US'
    }
  ]),
  currency = ref(job.value.currency || currencyOptions.value[0])
const backgroundColor = computed(() => helpers.fadeColor(details?.value.background_color, '0.08'))

// API functions to fetch skills options
const skillsSearchText = ref('')
const skillsOptions = ref([])
const skillsOptionsFetch = async (searchText) => {
  if (searchText.trim()?.length > 1) {
    try {
      errors.value.skills = []
      const res = await fetch(
        `http://52.66.224.33:8000/api/fetchOptions/skills/?search=${searchText}`
      )
      const json = await res.json()
      skillsOptions.value = json.results
      if (json?.results?.length === 0) {
        errors.value.skills = [`No option found matching "${searchText}"`]
      }
    } catch (err) {
      errors.value.skills = [err]
    }
  } else {
    skillsOptions.value = []
    errors.value.skills = ['Type 2 or more characters to get options']
  }
}
const debouncedSkillsOptionsFetch = debounce((...params) => {
  skillsOptionsFetch(params[0].value)
}, 300)

// API functions to fetch degrees options
const degreesSearchText = ref('')
const degreesOptions = ref([])
const degreesOptionsFetch = async (searchText) => {
  if (searchText.trim()?.length > 1) {
    try {
      errors.value.degrees = []
      const res = await fetch(
        `http://52.66.224.33:8000/api/fetchOptions/degree/?search=${searchText}`
      )
      const json = await res.json()
      degreesOptions.value = json.results
      if (json?.results?.length === 0) {
        errors.value.degrees = [`No option found matching "${searchText}"`]
      }
    } catch (err) {
      errors.value.degrees = [err]
    }
  } else {
    degreesOptions.value = []
    errors.value.degrees = ['Type 2 or more characters to get options']
  }
}
const debouncedDegreesOptionsFetch = debounce((...params) => {
  degreesOptionsFetch(params[0].value)
}, 300)

//watchers
watch(degreesSearchText, () => {
  debouncedDegreesOptionsFetch(degreesSearchText)
})
watch(skillsSearchText, () => {
  debouncedSkillsOptionsFetch(skillsSearchText)
})

watch(
  [
    type_of_position,
    experience,
    min_qualification,
    description,
    max_salary,
    min_salary,
    degrees,
    skills,
    currency
  ],
  () => {
    job.value = {
      ...job.value,
      type_of_position: type_of_position.value,
      experience: experience.value,
      min_qualification: min_qualification.value,
      description: description.value,
      currency: currency.value,
      min_salary: +min_salary.value || '',
      max_salary: +max_salary.value || '',
      degrees: degrees.value,
      skills: skills.value
    }
  }
)
watch(job, () => {
  ;(type_of_position.value = job?.value.type_of_position),
    (experience.value = job?.value.experience),
    (skills.value = job?.value.skills),
    (description.value = job?.value.description),
    (min_qualification.value = job?.value.min_qualification),
    (degrees.value = job?.value.degrees),
    (min_salary.value = job?.value.min_salary),
    (max_salary.value = job?.value.max_salary)
})
</script>
<template>
  <EditJob>
    <template #number> 2/5 </template>
    <template #job-action-buttons>
      <Buttons.Secondary value="Save Draft" textColorClass="base-color" @click="saveDraft" />
    </template>
    <template #main-content>
      <div class="edit-job-content-body flex flex-col gap-6">
        <div class="job-description">
          <div class="text-sm font-medium leading-5 mb-1">Job Description</div>
          <div class="h-72">
            <TextEditors.Default
              label="Job Description"
              placeholder="Describe the responsibilities of the position. You can always change this later."
              v-model="description"
              :color="details?.background_color"
            />
          </div>
        </div>
        <div class="upload-video">
          <Inputs.TextField
            v-if="file.length == 0"
            placeholder="Enter YouTube Link"
            label="Job Description Video"
            :requiredError="false"
            v-model:value="JdVideoLink"
            :errors="errors.title"
            :color="details?.background_color"
          />
          <p
            class="text-xs font-medium font-Inter leading-[18px] text-center"
            v-if="file.length == 0 && JdVideoLink.length == 0"
          >
            or
          </p>
          <div class="pt-2">
            <Uploads.DragAndDrop
              v-if="JdVideoLink.length == 0"
              :textColor="details?.background_color"
              v-model:file="file"
              :accept="['.mp4', '.mkv', '.h264']"
            />
          </div>
        </div>
        <Inputs.DropDown
          label="Work Experience"
          :choices="choices"
          :color="details?.background_color"
          v-model:selected="experience"
        />
        <Inputs.MultiSelect
          label="Skills"
          placeholder="Type to search (e.g. Figma, Python etc.)"
          :options="skillsOptions"
          v-model:selectedArray="skills"
          v-model:searchText="skillsSearchText"
          :errors="errors.skills"
          :color="details?.background_color"
        />
        <Inputs.DropDown
          label="Education Qualification"
          :choices="minQualificationOptions"
          v-model:selected="min_qualification"
          :color="details?.background_color"
        />

        <Inputs.MultiSelect
          label="Type of Degree"
          placeholder="Type to Search (e.g. BFA, BCom etc.)"
          :options="degreesOptions"
          v-model:searchText="degreesSearchText"
          v-model:selectedArray="degrees"
          :errors="errors.degrees"
          :color="details?.background_color"
        />
        <Inputs.DropDown
          label="Currency"
          :choices="currencyOptions"
          v-model:selected="currency"
          :color="details?.background_color"
        />
        <div class="flex flex-col">
          <label class="text-sm font-medium leading-5">Salary Range</label>
          <div class="flex gap-1 items-center">
            <div class="w-full">
              <Inputs.TextField
                v-model:value="min_salary"
                :icon="true"
                :color="details?.background_color"
              >
                <template #icon>
                  <div
                    class="currency-background p-2 rounded-lg"
                    :style="{
                      backgroundColor: backgroundColor,
                      color: details?.background_color
                    }"
                  >
                    {{ currency.symbol || '₹' }}
                  </div>
                </template>
              </Inputs.TextField>
            </div>
            <div>
              <svg
                width="12"
                height="2"
                viewBox="0 0 12 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.00004C0 0.631851 0.298477 0.333374 0.666667 0.333374H11.3333C11.7015 0.333374 12 0.631851 12 1.00004C12 1.36823 11.7015 1.66671 11.3333 1.66671H0.666667C0.298477 1.66671 0 1.36823 0 1.00004Z"
                  fill="#001325"
                  fill-opacity="0.92"
                />
              </svg>
            </div>
            <div class="w-full">
              <Inputs.TextField
                v-model:value="max_salary"
                :icon="true"
                :color="details?.background_color"
              >
                <template #icon>
                  <div
                    class="currency-background p-2 rounded-lg"
                    :style="{
                      backgroundColor: backgroundColor,
                      color: details?.background_color
                    }"
                  >
                    {{ currency.symbol || '₹' }}
                  </div>
                </template>
              </Inputs.TextField>
            </div>
          </div>
        </div>
      </div>
    </template>
  </EditJob>
</template>
