<script setup>
import { EmployerJob } from '@/layouts'
import { Buttons } from '@talocityui/ui'
import { useRouter, useRoute } from 'vue-router'
import { useNavStore } from '@/stores/NavStore'
import { useJobsStore } from '@/stores/JobsStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { onMounted } from 'vue'

const CompanyStore = useCompanyStore()
onMounted(() => {
  if (Object.keys(CompanyStore.companyDetails)?.length === 0) {
    CompanyStore.fetchCompanyDetails(2)
  }
  if (JobsStore.jobs?.length === 0) {
    JobsStore.fetchJob(route.params.id)
  }
})

const JobsStore = useJobsStore()
const NavStore = useNavStore()
const router = useRouter()
const route = useRoute()
NavStore.setActiveTab('Jobs')
NavStore.setActiveJobTab('Edit Job')
JobsStore.activeJob = {}
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
      <div>Post a job on Talocity</div>
    </template>
    <template #job-action-buttons>
      <slot name="job-action-buttons"></slot>
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
      <div class="flex flex-col px-6">
        <div class="edit-job-content-header flex justify-between py-3.5">
          <p class="font-Inter font-normal text-sm text-primary-color">Tell us about the role</p>
          <p class="font-Inter font-normal text-sm text-secondary-color">
            <slot name="number"></slot>
          </p>
        </div>
        <slot name="main-content"></slot>
        <div class="flex flex-row gap-3 justify-end mt-6 w-full">
          <Buttons.LeftSwitch
            @click="router.push({ name: `employerCreateJob-${+NavStore.activeJobScreen - 1}` })"
            :active="NavStore.activeJobScreen !== 1"
          />
          <Buttons.RightSwitch
            @click="router.push({ name: `employerCreateJob-${+NavStore.activeJobScreen + 1}` })"
            :active="NavStore.activeJobScreen !== 5"
          />
          <Buttons.Primary
            value="Save & Setup Assessments"
            :textColor="CompanyStore.companyDetails?.text_color"
            :bgColor="CompanyStore.companyDetails?.background_color"
          />
        </div>
      </div>
    </template>
  </EmployerJob>
</template>
