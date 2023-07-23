<script setup>
	import { EmployerDashboard } from "@/layouts"
	import SideBar from "./sidebar/sidebar-view.vue"
	import {helpers} from '@talocityui/theme'
	import { useNavStore } from "@/stores/NavStore";
	import { useCompanyStore } from "@/stores/CompanyStore";
	import {computed} from "vue";

    const NavStore = useNavStore();
    const CompanyStore = useCompanyStore();
	const details = computed(()=> CompanyStore.companyDetails)
	NavStore.setActiveTab("Company Profile");
	const fadedColor = computed(()=>helpers.fadeColor(CompanyStore?.companyDetails?.background_color,0.08))
</script>
<template>
	<EmployerDashboard>
		<template #sidebar>
			<SideBar/>	
		</template>
		<template #main-content>
			<div class="flex-flex-col w-full relative">
				<div class="w-full main-content-header py-7 px-9 flex justify-between"
					:style="{
						// backgroundColor: fadedColor
						backgroundColor: 'red'
					}"
				>
					<template v-if="NavStore.activeProfileSideBarTab !== 'Access Management'">
						<div class="company-logo h-full flex justify-center items-center">
							<img class="h-10" :src="details.logo_url" :alt="details.name">
						</div>
					</template>
					<slot name="access-management"></slot>
					<slot name="action-button"></slot>
				</div>		
				<div class="w-full">
					<div :class="['m-auto py-6 min-h-full',NavStore.activeProfileAccessNavTab === 'Access Management'?'w-[55%]':'w-full px-9']" >
						<slot name="main-content"></slot>
					</div>
				</div>
			</div>
		</template>
	</EmployerDashboard>
</template>