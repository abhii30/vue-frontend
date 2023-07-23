<script setup>
import {SidebarJobsList} from "@/views/Employer";
import  {useRoute} from 'vue-router';
import {useCompanyStore} from "@/stores/CompanyStore";

const CompanyStore = useCompanyStore();
const route = useRoute();
</script>

<template>
	<div class="sidebar-header flex justify-between items-end font-Inter">
		<h1 class="text-[32px] font-bold">Funnel</h1>
	</div>
	<SidebarJobsList />
</template>