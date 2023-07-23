<script setup>
	import {EmployerProfile} from '@/layouts'
	import {Buttons, TextEditors} from "@talocityui/ui"
	import {useNavStore} from "@/stores/NavStore"
	import { useCompanyStore } from "@/stores/CompanyStore"
	import { computed,ref } from 'vue'
	import {useAlertStore} from '@/stores/AlertStore'
	
  	const AlertStore = useAlertStore();

	const NavStore = useNavStore();
	NavStore.setActiveProfileSideBarTab("About the Company")
	
	const CompanyStore = useCompanyStore();
	const details = computed(()=> CompanyStore.companyDetails)
	const aboutCompany = ref(details.value?.description)
	const updateCompanyDetails = async() =>{
		const res = await CompanyStore.putCompanyDetails({
			...details.value,
			description:aboutCompany.value
		})
		if(res?.status == 'Success'){
			AlertStore.showAlert(res?.message,5000)
		}
	}
</script>
<template>
	<EmployerProfile>
		<template #action-button>
			<Buttons.Secondary value="Cancel" @click="$router.push({
				name:'employerProfileAbout',
			})"/>
		</template>
		
		<template #main-content>
			<div class="edit-job-content-body flex flex-col gap-6">
				<div class="h-72">
					<TextEditors.Default
						label="About the Company"
						v-model="aboutCompany"
						:color="details?.background_color"
						placeholder="Describe the company. You can talk about -
	&#8226; Company culture 
	&#8226; Company values
	&#8226; Diversity policy
	&#8226; Benefits provided etc..."
						/>
				</div>
				<div class="customise-submit flex justify-end">
					<Buttons.Primary :textColor="CompanyStore.companyDetails?.text_color" :bgColor="details?.background_color"  value="Save Changes" @click="updateCompanyDetails"></Buttons.Primary>
				</div>
			</div>
		</template>

	</EmployerProfile>
</template>