<script setup>
import { EmployerJob } from '@/layouts'
import { Buttons, Loaders } from '@talocityui/ui'
import { computed } from 'vue'
import { useJobsStore } from '@/stores/JobsStore'
import { useRouter, useRoute } from 'vue-router'
import { useNavStore } from '@/stores/NavStore'
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

const NavStore = useNavStore()
const router = useRouter()
const route = useRoute()

const JobsStore = useJobsStore()
const job = computed(() => JobsStore.activeJob)
const details = computed(() => CompanyStore.companyDetails)

NavStore.setActiveTab('Jobs')
NavStore.setActiveJobTab('Edit Job')
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
</script>
<template>
  <EmployerJob>
    <template #job-title>
      <div>{{ job?.title }}</div>
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
      <div class="flex flex-col px-6" v-if="Object.keys(job).length > 0">
        <div class="edit-job-content-header flex justify-between py-3.5">
          <p class="font-Inter font-normal text-sm text-primary-color">Tell us about the role</p>
          <p class="font-Inter font-normal text-sm text-secondary-color">
            <slot name="number"></slot>
          </p>
        </div>
        <slot name="main-content"></slot>
        <div class="flex flex-row gap-3 justify-end mt-6 w-full">
          <Buttons.LeftSwitch
            @click="router.push({ name: `employerEditJob-${+NavStore.activeJobScreen - 1}` })"
            :active="NavStore.activeJobScreen !== 1"
          />
          <Buttons.RightSwitch
            @click="router.push({ name: `employerEditJob-${+NavStore.activeJobScreen + 1}` })"
            :active="NavStore.activeJobScreen !== 5"
          />
          <Buttons.Primary
            value="Save & Setup Assessments"
            :textColor="details?.text_color"
            :bgColor="details?.background_color"
          />
        </div>
      </div>
      <div class="w-full flex items-center justify-center h-full" v-else>
        <Loaders.Default />
      </div>
    </template>
  </EmployerJob>
</template>
