<script setup>
	import {EmployerProfile} from '@/layouts'
	import {Buttons} from "@talocityui/ui"
	import {useNavStore} from "@/stores/NavStore"

	const NavStore = useNavStore();
	NavStore.setActiveProfileSideBarTab("Access Management");
</script>
<template>
	<EmployerProfile>
		<template #action-button>
			<Buttons.Secondary value="Cancel" @click="$router.push({
				name:'employerProfileAccessManagement',
			})"/>
		</template>
	</EmployerProfile>
</template>