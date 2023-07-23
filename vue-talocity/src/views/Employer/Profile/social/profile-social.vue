<script setup>
	import {EmployerProfile} from '@/layouts'
	import {FacebookIcon, YoutubeIcon, LinkIcon, LinkedinIcon, TwitterIcon} from '@talocityui/icons'
	import {Buttons} from "@talocityui/ui"
	import {useNavStore} from "@/stores/NavStore"
	import { computed } from "vue";
	import { useCompanyStore } from "@/stores/CompanyStore"

	const NavStore = useNavStore();
	NavStore.setActiveProfileSideBarTab("Social")
	
	const CompanyStore = useCompanyStore();
	const details = computed(()=> CompanyStore.companyDetails)
</script>
<template>
	<EmployerProfile>
		<template #action-button>
			<Buttons.Secondary value="Edit Profile" @click="$router.push({
				name:'editEmployerProfileSocial',
			})"/>
		</template>
		<template #main-content>
			<div class="flex flex-col gap-6">
				<div>
				  <p class="font-semibold text-base leading-5">
					<LinkedinIcon/>
				  </p>
				  <p class="font-normal text-sm leading-5 pt-1">
					{{details?.linkedin_profile || '-' }}
				  </p>
				</div>
				<div>
				  <p class="font-semibold text-base leading-5">
					<FacebookIcon/>
				  </p>
				  <p class="font-normal text-sm leading-5 pt-1">
					{{details?.facebook_profile || '-' }}
				  </p>
				</div>
				<div>
				  <p class="font-semibold text-base leading-5">
					<TwitterIcon/>
				  </p>
				  <p class="font-normal text-sm leading-5 pt-1">
					{{details?.twitter_profile || '-' }}
				  </p>
				</div>
				<div>
				  <p class="font-semibold text-base leading-5">
					<YoutubeIcon/>
				  </p>
				  <p class="font-normal text-sm leading-5 pt-1">
					{{ details?.youtube_profile || '-' }}
				  </p>
				</div>
				<div>
				  <p class="font-semibold text-base leading-5">
					<LinkIcon/>
				  </p>
				  <p class="font-normal text-sm leading-5 pt-1">
					{{ details?.youtube_profile || '-' }}
				  </p>
				</div>
				<div>
				  <p class="font-semibold text-base leading-5">
					Career Page
				  </p>
				  <p class="font-normal text-sm leading-5 pt-2">
					{{details?.career_page_link || '-' }}
				  </p>
				</div>
			</div>
		</template>
	</EmployerProfile>
</template>