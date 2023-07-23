<script setup>
	import {Alerts} from '@talocityui/ui';
	import {GreenTick} from '@talocityui/icons'
	import Header from "./employer-header/employer-header.vue"
	// import Sidebar from "./employer-sidebar/employer-sidebar.vue"
	import {useAlertStore} from '@/stores/AlertStore'
	import {useCompanyStore} from '@/stores/CompanyStore'
	import { onMounted } from 'vue';
	const AlertStore = useAlertStore();
	const CompanyStore = useCompanyStore();

	onMounted(()=>{	
		if(Object.keys(CompanyStore.companyDetails)?.length === 0 ){
			CompanyStore.fetchCompanyDetails(2);
		}
	})
</script>
<template>
	<Alerts.TopAlert 
		:show="AlertStore.showPrompt"
		:message= "AlertStore.alertMessage"
		:callToActionLabel = "AlertStore.alertCallToActionLabel"
		@call-to-action = "AlertStore.alertCallToAction"
		@close-alert = "AlertStore.showPrompt = false"
		:color="CompanyStore.companyDetails?.background_color"
	>
		<template #icon>
			<GreenTick />
		</template>
	</Alerts.TopAlert>
	<div class="box-border m-0 p-0 min-h-screen w-full flex flex-col">
		
		<Header />
		<div class="flex flex-auto">	
			
			<div class="sidebar border-r w-1/2 max-w-[328px] min-h-full t p-9">
				<slot name="sidebar"></slot>
				<!-- <Sidebar/> -->
			</div>
			<div class="m-0 p-0 flex flex-col items-center w-full flex-auto">
				<slot name="main-content"></slot>
			</div>
		</div>
	</div>
</template>