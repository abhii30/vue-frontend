<script setup>
	import { EmployerProfile } from '@/layouts'
	import { Buttons } from "@talocityui/ui"
	import { useNavStore } from "@/stores/NavStore"

	import { computed } from "vue";
	import { useCompanyStore } from "@/stores/CompanyStore"

	const NavStore = useNavStore();
	NavStore.setActiveProfileSideBarTab("About the Company")
	
	const CompanyStore = useCompanyStore();
	const details = computed(()=> CompanyStore.companyDetails)
</script>
<template>
	<EmployerProfile>
		<template #action-button>
			<Buttons.Secondary value="Edit Profile" @click="$router.push({
				name:'editEmployerProfileAbout',
			})"/>
		</template>
		<template #main-content>
			<div class="font-normal text-sm leading-[22px]">
				<div class="jobpost">
					<p class="font-semibold text-base leading-5">About {{ details.name }}</p>
					<p class="pt-2" v-html="details.description"></p>
				</div>
			</div>	
		</template>
	</EmployerProfile>
</template>