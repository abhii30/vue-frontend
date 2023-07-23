<script setup>
	import { Buttons } from "@talocityui/ui";
	import { useRouter } from "vue-router";
	import { useNavStore } from '@/stores/NavStore';
	import { useCompanyStore } from '@/stores/CompanyStore';

	const NavStore = useNavStore();
	const CompanyStore = useCompanyStore();
	const router = useRouter()
	const {navButtons, activeTab, setActiveTab} = NavStore;

	const onClickNav = (item) => {
		setActiveTab(item.title);
		return router.push({name:item.link});
	}
</script>
<template>
	<div class="flex justify-center items-center">
		<div class="mx-2"  :key="`menu-${index}`" v-for="(item,index) in navButtons">
			<Buttons.Navigation :value="item.title" :key="`nav-${index}`" :active="activeTab" 
				@click="onClickNav(item)"  :color='CompanyStore.companyDetails?.background_color'
			/>
		</div>
	</div>
</template>