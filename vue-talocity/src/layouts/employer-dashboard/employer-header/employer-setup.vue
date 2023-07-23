<script setup>
	import {CogIcon} from "@talocityui/icons"
	import UserIcon from "@/assets/user-icon.vue"
</script>
<template>
	<div class="flex items-center justify-between">
		<div class="setup-icon cursor-pointer mr-2">
			<CogIcon/>
		</div>
		<div class="user-info ml-2 cursor-pointer">
			<UserIcon/>
		</div>
	</div>
</template>
