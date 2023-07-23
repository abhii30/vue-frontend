<script setup>
import { EmployerJob } from '@/layouts'
import { Buttons, Loaders } from '@talocityui/ui'
import { computed, onUpdated } from 'vue'
import { useJobsStore } from '@/stores/JobsStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { useNavStore } from '@/stores/NavStore'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const JobsStore = useJobsStore()
const NavStore = useNavStore()
const CompanyStore = useCompanyStore()
const job = computed(() => JobsStore.createdTempJob)
const commaCurrency = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const stringCurrency = (value, format) => {
  let result
  if (format === 'IN') {
    if (+value / 10000000 >= 1) {
      result = (+value / 10000000).toFixed(2) + 'Cr'
    } else if (+value / 100000 >= 1) {
      result = (+value / 100000).toFixed(2) + 'L'
    } else if (+value / 1000 >= 1) {
      result = (+value / 1000).toFixed(2) + 'K'
    } else {
      result = value
    }
  }
  if (format === 'US') {
    if (+value / 1000000000 >= 1) {
      result = (+value / 1000000000).toFixed(2) + 'B'
    } else if (+value / 1000000 >= 1) {
      result = (+value / 1000000).toFixed(2) + 'M'
    } else if (+value / 1000 >= 1) {
      result = (+value / 1000).toFixed(2) + 'K'
    } else {
      result = value
    }
  }
  return result
}
const salary_range = computed(() => {
  if (job.value.min_salary && job.value.max_salary) {
    return `${job.value.currency.symbol}${stringCurrency(
      job.value.min_salary,
      job.value.currency.format
    )} - ${job.value.currency.symbol}${stringCurrency(
      job.value.max_salary,
      job.value.currency.format
    )}`
  } else if (job.value.min_salary) {
    return `${job.value.currency.symbol}${stringCurrency(
      job.value.min_salary,
      job.value.currency.format
    )} and above`
  } else if (job.value.max_salary) {
    return `Upto ${job.value.currency.symbol}${stringCurrency(
      job.value.max_salary,
      job.value.currency.format
    )}`
  } else {
    return ''
  }
})
// const isPublished = computed(()=>job.value.status === "Active");
NavStore.setActiveJobTab('Preview')
// const publishJob = () => {
// 	const publishedJob = {
// 		...job.value,
// 		status: "Active",
// 	}
// 	JobsStore.updateJob(publishedJob);
// 	JobsStore.putJob(publishedJob);
// 	return router.go();
// }
const tabs = [
  {
    value: 'Preview',
    link: 'employerCreateJobOverView'
  },
  {
    value: 'Edit Job',
    link: 'employerCreateJob'
  }
]
const onClickTab = (tab) => {
  return router.push({ name: tab.link, params: { id: route.params.id } })
}
</script>
<template>
  <EmployerJob>
    <template #job-title>
      <div>Post a Job on Talocity</div>
    </template>
    <template #job-navbar>
      <div
        class="nav-pill cursor-pointer"
        v-for="(tab, index) in tabs"
        @click="onClickTab(tab)"
        :key="`tab-${index}`"
      >
      <Buttons.Tab :value="tab.value" :isActive="NavStore.activeJobTab === tab.value" :color="CompanyStore?.companyDetails?.background_color" />
      </div>
    </template>
    <template #job-main-content>
      <div class="px-6 flex flex-col font-Inter">
        <div class="job-overview-header py-3.5 font-normal text-sm">Job Preview</div>
        <div class="job-overview-body">
          <div class="flex flex-col pt-3.5">
            <span class="not-italic font-semibold text-2xl leading-8" v-if="job?.title">
              {{ job?.title }}
            </span>
            <span class="pt-2 not-italic font-semibold text-base leading-6 flex">
              <div class="job-salary-range" v-if="job.min_salary || job.max_salary">
                {{ salary_range }} Per Annum
              </div>
              <div v-if="salary_range !== '' && job?.location?.length > 0" class="mx-0.5">|</div>
              <div class="job-location ml-0.5">
                {{
                  job.remote_policy === 'Remote'
                    ? 'Remote'
                    : job.location?.length > 1
                    ? 'Multiple Locations'
                    : job?.location?.[0]
                }}
              </div>
            </span>
          </div>

          <div class="flex flex-row pt-5">
            <div class="w-1/3">
              <div class="" v-if="job?.industry">
                <p class="font-semibold text-base leading-5">Industry</p>
                <p class="font-normal text-sm leading-5 pt-2">{{ job?.industry }}</p>
              </div>

              <div class="pt-6" v-if="job?.department">
                <p class="font-semibold text-base leading-5">Department</p>
                <p class="font-normal text-sm leading-5 pt-2">{{ job?.department }}</p>
              </div>

              <div class="pt-6" v-if="job?.location?.length > 1">
                <p class="font-semibold text-base leading-5">Locations</p>
                <ul class="ml-5 pt-2 list list-disc">
                  <li
                    class="font-normal text-sm leading-5"
                    v-for="(location, index) in job?.location"
                    :key="`location-${index}`"
                  >
                    {{ location }}
                  </li>
                </ul>
              </div>

              <div class="pt-6" v-if="job?.type_of_position">
                <p class="font-semibold text-base leading-5">Type of Position</p>
                <p class="font-normal text-sm leading-5 pt-2">{{ job?.type_of_position }}</p>
              </div>
              <div class="pt-6" v-if="job?.visibility">
                <p class="font-semibold text-base leading-5">Job Visibility</p>
                <p class="font-normal text-sm leading-5 pt-2">{{ job?.visibility }}</p>
              </div>
              <div class="pt-6" v-if="job?.experience">
                <p class="font-semibold text-base leading-5">Work Experience</p>
                <p class="font-normal text-sm leading-5 pt-2">{{ job?.experience }}</p>
              </div>

              <div class="pt-6" v-if="job?.remote_policy">
                <p class="font-semibold text-base leading-5">Remote Policy</p>
                <p class="font-normal text-sm leading-5 pt-2">{{ job?.remote_policy }}</p>
              </div>

              <div class="pt-6" v-if="job?.min_qualification">
                <p class="font-semibold text-base leading-5">Education Qualification</p>
                <p class="font-normal text-sm leading-5 pt-2">{{ job?.min_qualification }}</p>
              </div>

              <div class="pt-6" v-if="job?.degrees">
                <p class="font-semibold text-base leading-5">Degree Required</p>
                <p class="font-normal text-sm leading-5 pt-2">{{ job?.degrees.join(' | ') }}</p>
              </div>

              <div class="pt-6" v-if="job?.skills?.length > 0">
                <p class="font-semibold text-base leading-5">Skills</p>
                <ul class="ml-5 pt-2 list list-disc">
                  <li
                    class="font-normal text-sm leading-5"
                    v-for="(skill, index) in job?.skills"
                    :key="`skill-${index}`"
                  >
                    {{ skill }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="w-2/3 font-normal text-sm leading-[22px]" v-if="job?.description">
              <div v-html="job?.description" class="job-description"></div>
            </div>
          </div>
        </div>
        <div class="job-overview-footer">
          <div class="published-buttons flex justify-end py-6" v-if="!isPublished">
            <Buttons.Secondary value="Save Draft" textColorClass="base-color" />
            <Buttons.Primary
              @click="() => {}"
              :textColor="CompanyStore.companyDetails?.text_color" 
              :bgColor="CompanyStore.companyDetails?.background_color"  
              class="ml-3"
              value="Save & Setup Assessments"
            />
          </div>
        </div>
      </div>
    </template>
  </EmployerJob>
</template>
