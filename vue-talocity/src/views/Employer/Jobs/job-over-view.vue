<script setup>
import { EmployerJob } from '@/layouts'
import { helpers } from '@talocityui/theme'
import { Buttons, Loaders } from '@talocityui/ui'
import { TrashCanIcon } from '@talocityui/icons'
import { computed } from 'vue'
import { useJobsStore } from '@/stores/JobsStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { useNavStore } from '@/stores/NavStore'
import { useAlertStore } from '@/stores/AlertStore'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const JobsStore = useJobsStore()
const CompanyStore = useCompanyStore()
const NavStore = useNavStore()
const AlertStore = useAlertStore()
const job = computed(() => JobsStore.activeJob)
const isPublished = computed(() => job.value.status === 'Active')
const details = computed(() => CompanyStore.companyDetails)

NavStore.setActiveJobTab('Overview')

const unPublishJob = () => {
  const unPublishedJob = {
    ...job.value,
    status: 'Drafts'
  }
  JobsStore.updateJob(unPublishedJob)
  JobsStore.putJob(unPublishedJob)
  return router.go()
}
const publishJob = () => {
  const publishedJob = {
    ...job.value,
    status: 'Active'
  }
  JobsStore.updateJob(publishedJob)
  JobsStore.putJob(publishedJob)
  return router.go()
}
const tabs = [
  {
    value: 'Overview',
    link: 'employerJobOverView'
  },
  {
    value: 'Edit Job',
    link: 'employerEditJob'
  }
]
const onClickTab = (tab) => {
  return router.push({ name: tab.link, params: { id: route.params.id } })
}

const deleteJob = async () => {
  const res = await JobsStore.deleteJob(JobsStore.activeJob)
  AlertStore.showAlert(res?.message, 5000)
  router.push({ name: 'employerJobs' })
}
JobsStore.fetchJob(route.params.id)
</script>
<template>
  <EmployerJob>
    <template #job-title>
      <div>
        {{ job?.title }}
      </div>
    </template>
    <template #job-action-buttons>
      <div class="published-buttons" v-if="isPublished">
        <Buttons.Primary
          @click="unPublishJob"
          bgColorClass="talocity-blue-color"
          class="mr-1"
          value="Unpublish Job"
        />
        <Buttons.Secondary
          value="Clone"
          @click="JobsStore.cloneJob(job)"
          textColorClass="base-color"
        />
      </div>
    </template>
    <template #job-navbar>
      <div
        class="nav-pill cursor-pointer"
        v-for="(tab, index) in tabs"
        @click="onClickTab(tab)"
        :key="`tab-${index}`"
      >
        <Buttons.Tab
          :value="tab.value"
          :isActive="NavStore.activeJobTab === tab.value"
          :color="CompanyStore?.companyDetails?.background_color"
        />
      </div>
    </template>
    <template #job-main-content>
      <div class="px-6 flex flex-col font-Inter" v-if="Object.keys(job).length > 0">
        <div class="job-overview-header py-3.5 font-normal text-sm flex justify-between">
          <div class="job-status">
            {{ job?.status === 'Active' ? 'Live Job' : 'Draft' }}
          </div>
          <div class="job-actions">
            <TrashCanIcon class="cursor-pointer" @click="deleteJob" />
          </div>
        </div>
        <div class="job-overview-body">
          <div class="flex flex-col pt-3.5">
            <span class="not-italic font-semibold text-2xl leading-8">{{ job?.title }}</span>
            <span class="pt-2 not-italic font-semibold text-base leading-6 flex">
              <div class="job-salary-range" v-if="job?.salary_range">{{ job?.salary_range }} |</div>
              <div class="job-location ml-0.5">
                {{
                  job.remote_policy === 'Remote'
                    ? 'Remote'
                    : job.location.length > 1
                    ? 'Multiple Locations'
                    : job.location[0]
                }}
              </div>
            </span>
          </div>

          <div class="flex flex-row pt-5">
            <div class="w-1/3" v-if="job?.industry">
              <div class="">
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

              <div class="pt-6" v-if="job?.skills">
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
            <div class="w-2/3 font-normal text-sm leading-[22px]">
              <div class="job-post">
                <p v-html="job?.description"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="job-overview-footer">
          <div class="published-buttons flex justify-end py-6" v-if="!isPublished">
            <Buttons.Secondary value="Save Draft" textColorClass="base-color" />
            <Buttons.Primary
              @click="publishJob"
              :textColor="details?.text_color"
              :bgColor="details?.background_color"
              class="ml-3"
              value="Publish Job"
            />
          </div>
        </div>
      </div>
      <div class="w-full flex items-center justify-center h-full" v-else>
        <Loaders.Default />
      </div>
    </template>
  </EmployerJob>
</template>
