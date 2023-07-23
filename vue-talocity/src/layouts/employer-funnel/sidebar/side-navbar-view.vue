<script setup>
    import { useCompanyStore } from '@/stores/CompanyStore'
    import { useNavStore } from '@/stores/NavStore'
    const CompanyStore = useCompanyStore()
    import {Buttons} from '@talocityui/ui'
	const NavStore = useNavStore();
	const { activeFunnelSideBarTab } = NavStore;
    const sideNavItems = [
		{
			title:"Profile",
			link:"employerFunnelSeekerProfile"
		},
		{
			title:"Screnning",
			link:"employerFunnelSeekerScrenning"
		},
		{
			title:"Domain Assessment",
			link:"employerFunnelSeekerDomain"
		},
		{
			title:"Typing Assessment",
			link:"employerFunnelSeekerTyping"
		},
		{
			title:"Voice Assessment",
			link:"employerFunnelSeekerVoice"
		},
		{
			title:"Video Assessment",
			link:"employerFunnelSeekerVideo"
		}
	]
</script>
<template>
        <div class="flex flex-col mt-4">
                <div
                    v-for="item in sideNavItems"
                    class="w-full pl-4"
                    :key="item"
                    @click="$router.push({ name: item.link })"
                    >
                    <Buttons.Sidebar
                        :color="CompanyStore.companyDetails?.background_color"
                        :isActive="activeFunnelSideBarTab === item.title"
                        :value="item.title"
                    ></Buttons.Sidebar>
                </div>
        </div>
</template>