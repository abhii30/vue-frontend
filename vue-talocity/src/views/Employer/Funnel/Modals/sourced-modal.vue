<script setup>
	import {ref,computed} from 'vue'
    import {Modals,Buttons,Tables} from '@talocityui/ui'
	import { useCompanyStore } from '@/stores/CompanyStore'
	import {useNavStore} from '@/stores/NavStore'

	const CompanyStore = useCompanyStore()

	const NavStore = useNavStore();
	
	// AlertStore.showAlert("Errror MessaGE",2000)

	const props = defineProps({
		showModal:{
			type:Boolean,
			default:false
		}
	})

	let changeShowModal = computed(()=> props.showModal);

	const sideTabs =  [
		{
			value: 'Direct',
			count: 1000
		},
		{
			value: 'Indirect',
			count: 1500
		}
	]
	const onClickTab = (tab) => {
  		NavStore.setActiveSourcedFunnelTab(tab.value)
	}	
	const headers = ref(['Batch Name', 'Uploaded On', 'Uploaded By', 'Action'])
	const batchDetails = ref([
	{
		'Batch Name': 'Text',
		'Uploaded On': 1200,
		'Uploaded By': 800,
		'Action': 'Resend Notification'
	},
	{
		'Batch Name': 'IVR',
		'Uploaded On': 10,
		'Uploaded By': 10,
		'Action': 'Resend Notification'
	},
	{
		'Batch Name': 'Email',
		'Uploaded On': 10,
		'Uploaded By': 10,
		'Action': 'Resend Notification'
	},
	{
		'Batch Name': 'Whatsapp',
		'Uploaded On': 10,
		'Uploaded By': 10,
		'Action': 'Resend Notification'
	}
	])

	const indirectHeader = ref([ 'QRCode',
		'Registered',
		'Not Applied',
		'status',
		"Created By",
		'Action'])

	const indirectBatch =[
	{
		QRCode: 'Text',
		Registered: 1200,
		'Not Applied': 800,
		status:'Active',
		"Created By": "Anuj Singh",
		Action: 'Resend Notification',
	},
	{
		QRCode: 'Text',
		Registered: 1200,
		'Not Applied': 800,
		status:'InActive',
		"Created By": "Anuj Singh",
		Action: 'Resend Notification',
	},
	{
		QRCode: 'Text',
		Registered: 1200,
		'Not Applied': 800,
		status:'InActive',
		"Created By": "Anuj Singh",
		Action: 'Resend Notification',
	},
	{
		QRCode: 'Text',
		Registered: 1200,
		'Not Applied': 800,
		status:'Active',
		"Created By": "Anuj Singh",
		Action: 'Resend Notification',
	},
	]

</script>

<template>
	showModal : {{ showModal }}
		changeShowModal : {{ changeShowModal }}
			<Modals.RightSideWindow 
			v-model:show="changeShowModal"
			width="max-content">
		<template #body>
			<div class="flex flex-col mx-9">
				
				<p class="text-xl font-Inter font-semibold leading-6 ">Sourced Job Seeker</p>

				<div class="sidebar-jobs-tabs w-64 flex text-sm pt-5 pb-4" >
					<div class="nav-pill w-full cursor-pointer" v-for="(tab,index) in sideTabs" @click="onClickTab(tab)" :key="`sidebar-tab-${index}`">
						<Buttons.Tab :value="tab.value+` (${tab.count})`" :isActive="NavStore.activeSourcedFunnelTab === tab.value" :color="CompanyStore?.companyDetails?.background_color" />
					</div>
				</div>
				<div class="" v-if="NavStore.activeSourcedFunnelTab === 'Direct'">
					<Tables.StatsTable />
					<p class="text-sm font-medium leading-5 pt-6 pb-3 pl-2">Valid email & mobile <span class="pl-2 text-xs font-normal leading-[18px]">200</span>
					</p>
					<div class="custom-hr mb-3"></div>
					<Tables.BatchInfoTable :headers="headers" :batchDetails="batchDetails" />
				</div>
				<div class="" v-if="NavStore.activeSourcedFunnelTab === 'Indirect'">
					<Tables.BatchInfoTable :headers="indirectHeader" :batchDetails="indirectBatch" />
				</div>
			</div>

		</template>
    ></Modals.RightSideWindow>
</template>

<style scoped>
.custom-hr {
	border: none;
	height: 2px;
	background-color: #000;
	margin: 0px;
	width: 100%;
}
</style>