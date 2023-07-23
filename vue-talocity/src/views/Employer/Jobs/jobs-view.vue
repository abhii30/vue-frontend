<script setup>
	import {EmployerDashboard, EmployerJob} from "@/layouts"
	import {NoJobsView, JobSidebarView}from "@/views/Employer"
	import {RouterView} from "vue-router"
</script>
<template>
	<EmployerDashboard>
		<template #sidebar>
			<JobSidebarView/>
		</template>
		<template #main-content>
			<RouterView/>
		</template>
	</EmployerDashboard>
</template>