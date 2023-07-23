<script setup>
	import {useCompanyStore} from "@/stores/CompanyStore";
	import {useNavStore} from "@/stores/NavStore"
	import {Buttons} from '@talocityui/ui'
	const NavStore = useNavStore();
	const {activeProfileSideBarTab} = NavStore;
	const CompanyStore = useCompanyStore();
	const sideNavItems = [
		{
			title:"Overview",
			link:"employerProfileOverview"
		},
		{
			title:"About the Company",
			link:"employerProfileAbout"
		},
		{
			title:"Social",
			link:"employerProfileSocial"
		},
		{
			title:"Access Management",
			link:"employerProfileAccessManagement"
		},
		{
			title:"Customise",
			link:"employerProfileCustomise"
		},
	]
</script>
<template>
	<div class="flex flex-col">
		<div v-for="item in sideNavItems" class="w-full" :key="item" @click="$router.push({name:item.link})">
			<Buttons.Sidebar :color="CompanyStore.companyDetails?.background_color" :isActive="activeProfileSideBarTab === item.title" :value="item.title" textPadding='0px'></Buttons.Sidebar>
		</div>
	</div>
</template>
<style scoped>
	.link.active{
		font-weight: bold;
	}
</style>