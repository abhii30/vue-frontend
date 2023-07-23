<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { JobsWrapper } from '@talocityui/wrappers'
import { useJobsStore } from '@/stores/JobsStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { useNavStore } from '@/stores/NavStore'
import { Inputs, Buttons } from '@talocityui/ui'
import { Search } from '@talocityui/icons'

const JobsStore = useJobsStore()
const NavStore = useNavStore()
const CompanyStore = useCompanyStore()
const { jobs } = storeToRefs(JobsStore)
const statusJobs = computed(() =>
  jobs.value.filter((job) => job.status === NavStore.activeSideBarTab)
)
const starredJobs = computed(() => statusJobs.value.filter((job) => job.is_starred))
const unStarredJobs = computed(() => statusJobs.value.filter((job) => !job.is_starred))
onMounted(() => {
  JobsStore.fetchJobs()
})
const router = useRouter()
const sideTabs = computed(() => [
  {
    value: 'Active',
    count: jobs.value.filter((job) => job.status === 'Active').length
  },
  {
    value: 'Drafts',
    count: jobs.value.filter((job) => job.status === 'Drafts').length
  }
])
const onClickTab = (tab) => {
  NavStore.setActiveSideBarTab(tab.value)
}

const toggleIsStarred = (job) => {
  const updatedJob = {
    ...job,
    is_starred: !job.is_starred
  }
  JobsStore.updateJob(updatedJob)
  JobsStore.putJob(updatedJob)
}
const changeJob = (job) => {
  router.push({ name: 'employerJobOverView', params: { id: job._id } })
  JobsStore.fetchJob(job._id)
}
</script>
<template>
	<div class="sidebar-jobs flex flex-col mt-5">
		<div class="sidebar-search-bar">
			<Inputs.TextField
				placeholder="Search by job"
				:icon="true"
			>
				<template #icon>
					<Search/>
				</template>
			</Inputs.TextField>
		</div>
		<div class="sidebar-jobs-tabs w-full flex text-sm py-3" >
			<div class="nav-pill w-full cursor-pointer" v-for="(tab,index) in sideTabs" @click="onClickTab(tab)" :key="`sidebar-tab-${index}`">
				<Buttons.Tab :value="tab.value+` (${tab.count})`" :isActive="NavStore.activeSideBarTab === tab.value" :color="CompanyStore?.companyDetails?.background_color" />
			</div>
		</div>
		<div class="sidebar-all-jobs">
			<div class="sidebar-other-jobs-list">
				<div class="starred-jobs">
					<div class="job-item pb-3 cursor-pointer" v-for="job in starredJobs" :key="job._id">
						<div @click="changeJob(job)">
							<JobsWrapper :job="job" :active="JobsStore.activeJob?._id === job._id" @toggle="toggleIsStarred"  :color="CompanyStore?.companyDetails?.background_color"/>
						</div>
					</div>
				</div>
				<div class="un-starred-jobs" v-if="unStarredJobs.length>0">
					<div class="job-item pb-3 cursor-pointer" v-for="job in unStarredJobs" :key="job._id">
						<div @click="changeJob(job)" >
							<JobsWrapper :job="job" :active="JobsStore.activeJob?._id === job._id" @toggle="toggleIsStarred" :color="CompanyStore?.companyDetails?.background_color"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="font-Inter text-sm" v-if="statusJobs.length === 0">
			You have no {{NavStore.activeSideBarTab.toLowerCase()}} jobs.
			<span 
				class="cursor-pointer"
				:style="{
					color:CompanyStore?.companyDetails?.background_color
				}"
			>Post a Job</span>
		</div>
	</div> 
</template>
