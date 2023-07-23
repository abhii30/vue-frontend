<script setup>
	import {useNavStore} from "@/stores/NavStore";
	import {useCompanyStore} from "@/stores/CompanyStore";
	import {helpers} from '@talocityui/theme';
	import { computed } from "vue";

	const CompanyStore = useCompanyStore();
	const NavStore = useNavStore();
	NavStore.setActiveTab("Jobs");
	const fadedColor = computed(()=>helpers.fadeColor(CompanyStore?.companyDetails?.background_color,0.08))

</script>
<template>
		<div class="job-header h-32 flex flex-col justify-between w-full"
			:style="{
				backgroundColor:fadedColor
			}"
		>
			<div class="px-9 pt-7 flex justify-between">
				<h1 class="font-Inter font-medium text-lg">
					<slot name="job-title"></slot>
				</h1>
				<div class="job-action-buttons">
					<slot name="job-action-buttons"></slot>
				</div>
			</div>
			<div class="job-nav-bar px-9 flex text-sm" >
				<slot name="job-navbar"></slot>
			</div>
		</div>
		<div class="job-content flex-auto w-3/5 rounded-t-2xl translate-y-[-42px] z-10 bg-white">
			<slot name="job-main-content"></slot>
		</div>
</template>
<style>
	
</style>