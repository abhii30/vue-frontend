<script setup>
	import { ref,computed, watch } from "vue";
	import { useCompanyStore } from "@/stores/CompanyStore"
	import {EmployerProfile} from '@/layouts'
	import {Buttons,Inputs} from "@talocityui/ui"
	import {useNavStore} from "@/stores/NavStore"
	import {useAlertStore} from '@/stores/AlertStore'
	
  	const AlertStore = useAlertStore();

	const NavStore = useNavStore();
	NavStore.setActiveProfileSideBarTab("Overview")

	const CompanyStore = useCompanyStore();
	const details = computed(()=> CompanyStore.companyDetails)

	let title = ref(details.value?.name),
		website = ref(details.value?.website),
		companyType = ref(details.value?.type),
		industryType = ref(details.value?.industry),
		speciality = ref(details.value?.speciality),
		employeeCount = ref(details.value?.employee_count),
		foundedIn = ref(details.value?.founded_in)


	let companyTypeOptions = [
		'Public',
		'Private',
		'Government',
		'Retail',
		'IT',
		'Manufacturing',
		'Textiles'
	]

	const updateCompanyDetails = async() =>{
		const res = await CompanyStore.putCompanyDetails({
			...details.value,
			name: title.value,
            website: website.value,
            type: companyType.value,
            industry: industryType.value,
            speciality: speciality.value,
			employee_count: employeeCount.value,
            founded_in: foundedIn.value
		})
		if(res?.status == 'Success'){
			AlertStore.showAlert(res?.message,5000)
		}
	}

	watch(details,()=>{
		title.value = details.value?.name
        website.value = details.value?.website
        companyType.value = details.value?.type
        industryType.value = details.value?.industry
        speciality.value = details.value?.speciality
        employeeCount.value = details.value?.employee_count
        foundedIn.value = details.value?.founded_in
	})
</script>
<template>
	<EmployerProfile>
		<template #action-button>
			<Buttons.Secondary value="Cancel" @click="$router.push({
				name:'employerProfileOverview',
			})"/>
		</template>
		<template #main-content>
			<div class="edit-job-content-body flex flex-col gap-6">
				<Inputs.TextField
				placeholder="e.g. Software Engineer, Product Designer etc."
				label="Company Name"
				:required="true"
				v-model:value="title"
				:checkError="false"
				:color="details?.background_color"
				/>
				<Inputs.TextField
				placeholder="e.g. Software Engineer, Product Designer etc."
				label="Company Website"
				:required="true"
				v-model:value="website"
				:checkError="false"
				:color="details?.background_color"
				/>
				<Inputs.DropDown
				label="Type of Company"
				placeholder="Type of Company"
				:choices="companyTypeOptions"
				v-model:selected="companyType"
				:color="details?.background_color"
				/>
				<Inputs.TextField
				placeholder="e.g. Software Engineer, Product Designer etc."
				label="Type of Industry"
				v-model:value="industryType"
				:checkError="false"
				:color="details?.background_color"
				/>
				<Inputs.TextField
				placeholder="e.g. Software Engineer, Product Designer etc."
				label="Company Speciality"
				v-model:value="speciality"
				:checkError="false"
				:color="details?.background_color"
				/>
				<Inputs.TextField
				placeholder="e.g. Software Engineer, Product Designer etc."
				label="Employee Count"
				v-model:value="employeeCount"
				:checkError="false"
				:color="details?.background_color"
				/>
				<Inputs.TextField
				placeholder="e.g. Software Engineer, Product Designer etc."
				label="Founded In"
				v-model:value="foundedIn"
				:checkError="false"
				:color="details?.background_color"
				/>
				<div class="customise-submit flex justify-end">
					<Buttons.Primary :textColor="CompanyStore.companyDetails?.text_color" :bgColor="CompanyStore.companyDetails?.background_color"  value="Save Changes" @click="updateCompanyDetails"></Buttons.Primary>
				</div>
			</div>
        </template>
	</EmployerProfile>
</template>