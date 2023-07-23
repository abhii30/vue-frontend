<script setup>
	import { EmployerJob } from '@/layouts'
	import { Buttons } from '@talocityui/ui'
	import { computed } from 'vue'
	import {useJobsStore} from "@/stores/JobsStore";
	import {useRoute} from "vue-router";
	import {useNavStore} from "@/stores/NavStore";

    const NavStore = useNavStore();
	const route = useRoute();

	const JobsStore = useJobsStore();
	const job = computed(()=>JobsStore.jobs.find(job=>job._id === route.params.id));
    const isPublished = computed(()=>job?.value.status === "Active");
	NavStore.setActiveJobTab("Edit Job");
</script>
<template>
  <EmployerJob>
 	<template #job-title>
      <div v-if="isPublished">{{job?.title}}</div>
      <div v-else>Post a job on Talocity</div>
    </template>
    <template #job-action-buttons>
      <slot name="job-action-buttons"></slot>
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
      	</div>
    </template>
  </EmployerJob>
</template>
