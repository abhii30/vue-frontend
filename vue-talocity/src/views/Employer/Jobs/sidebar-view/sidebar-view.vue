<script setup>
import {SidebarJobsList} from "@/views/Employer";
import  {useRoute} from 'vue-router';
import {useCompanyStore} from "@/stores/CompanyStore";

const CompanyStore = useCompanyStore();
const route = useRoute();
</script>

<template>
	<div class="sidebar-header flex justify-between items-end font-Inter">
		<h1 class="text-[32px] font-bold">Jobs</h1>
		<div class="post-a-job text-hint-color font-semibold text-sm translate-y-[-50%]">
			<p 
				v-if="route.name === 'employerCreateJob-1' || route.name === 'employerCreateJob-2' || route.name === 'employerCreateJobOverView'" 
				class="text-hint-color">
				Post a Job
			</p>
			<router-link 
				:to="{ name: 'employerCreateJob' }" 
				v-else
				class="cursor-pointer"
				:style="{
					color:CompanyStore.companyDetails.background_color
				}"
			>
				Post a Job
			</router-link>
			
		</div>
	</div>
	<SidebarJobsList />
</template>