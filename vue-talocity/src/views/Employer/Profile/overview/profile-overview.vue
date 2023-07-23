<script setup>
	import { computed } from "vue";
	import { useCompanyStore } from "@/stores/CompanyStore"
	import { EmployerProfile } from '@/layouts'
	import { Buttons } from "@talocityui/ui"
	import { useNavStore } from "@/stores/NavStore"

	const NavStore = useNavStore();
	NavStore.setActiveProfileSideBarTab("Overview")
	
	const CompanyStore = useCompanyStore();
	const details = computed(()=> CompanyStore.companyDetails)
</script>
<template>
	<EmployerProfile>
		<template #action-button>
			<Buttons.Secondary value="Edit Profile" @click="$router.push({
				name:'editEmployerProfileOverview',
			})"/>
		</template>
		<template #main-content>
			<div class="flex">
				<div class="w-1/3 flex flex-col gap-6">
					<div>
						<p class="font-semibold text-base leading-5">Company Name</p>
						<p class="font-normal text-sm leading-5 pt-2">{{details.name}}</p>
					</div>
	
					<div>
						<p class="font-semibold text-base leading-5">Company Website</p>
						<p class="font-normal text-sm leading-5 pt-2">{{details.website}}</p>
					</div>
					
					<div>
						<p class="font-semibold text-base leading-5">Type of Company</p>
						<p class="font-normal text-sm leading-5 pt-2">{{ details.type }}</p>
					</div>
					
					<div>
						<p class="font-semibold text-base leading-5">Type of Industry</p>
						<p class="font-normal text-sm leading-5 pt-2">{{ details.industry }}</p>
					</div>
					
					<div>
						<p class="font-semibold text-base leading-5">Company Speciality</p>
						<p class="font-normal text-sm leading-5 pt-2">{{ details.speciality}}</p>
					</div>
					
					<div>
						<p class="font-semibold text-base leading-5">Employee Count</p>
						<p class="font-normal text-sm leading-5 pt-2">{{ details.employee_count}}</p>
					</div>
					<div>
						<p class="font-semibold text-base leading-5">Founded In</p>
						<p class="font-normal text-sm leading-5 pt-2">{{ details.founded_in}}</p>
					</div>
				</div>
				<div class="w-2/3 font-normal text-sm leading-[22px]">
					<div class="jobpost">
						<p class="font-semibold text-base leading-5">Description</p>
						<p class="pt-2" v-html="details.description"></p>
					</div>
				</div>
			</div>
		</template>
	</EmployerProfile>
</template>