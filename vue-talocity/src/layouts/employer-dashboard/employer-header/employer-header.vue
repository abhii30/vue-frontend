<script setup>
	import Logo from "@/assets/talocity-logo.vue"
	import NavBar from "./employer-navbar.vue"
	import NavSetup from "./employer-setup.vue"
</script>
<template>
	<div class="flex justify-between py-2.5 pr-9 m-0 shadow-sm">
		<div class="logo cursor-pointer">
			<Logo/>
		</div>
		<NavBar/>
		<NavSetup/>
	</div>
</template>