<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { UpIcon, DownIcon } from '@talocityui/icons'
import { ref } from 'vue';
defineProps({
  items:{
	  type: Array,
	  default: () => []
  }
})
const menuActive = ref(false);
const selecteditem = ref("");

const selectitem = (item) => {
	selecteditem.value = item;
	toggleActive();
}

const toggleActive = () => {
	menuActive.value = !menuActive.value
}
</script>
<template>
	<!-- <div class="">
		<Menu as="div" class="relative text-left">
			<div>
				<MenuButton as="select" @click="toggleActive" class="inline-flex w-full justify-between px-4 py-[9px] rounded-lg font-Inter text-sm leading-[18px] font-normal text-base-color shadow-sm border border-[#DADCE0] hover:border-talocity-blue-color selection:border-talocity-blue-color active:border-talocity-blue-color">
					<div>{{selecteditem}}</div>
					<UpIcon v-if="menuActive" class="-mr-1 h-5 w-5 text-talocity-blue-color" aria-hidden="true" />
					<DownIcon v-else class="-mr-1 h-5 w-5 text-talocity-blue-color" aria-hidden="true" />
				</MenuButton>
			</div>
		
			<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
				<div v-if="menuActive" class="w-full absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none pr-2  py-1">
					<div class="menu-items relative w-full max-h-64 overflow-y-scroll">
						<MenuItem v-for="(item,index) in items" :key="`item-${index}`" v-slot="{ active }">
							<div as="option" @click="selectitem(item)" :class="[active ? 'bg-talocity-blue-color-faded' : '', 'cursor-pointer font-Inter text-sm leading-[18px] font-normal block rounded px-3 py-2 my-0.5 mx-2 text-primary-color']">{{ item }}</div>
						</MenuItem>
					</div>
				</div>
			</transition>
		</Menu>
	</div>-->
	<!-- <v-select
      :items="items"
      density="comfortable"
    ></v-select>  -->
	<!-- <select class="relative inline-flex w-full justify-between px-4 py-[9px] rounded-lg font-Inter text-sm leading-[18px] font-normal text-base-color shadow-sm border border-[#DADCE0] hover:border-talocity-blue-color selection:border-talocity-blue-color active:border-talocity-blue-color cursor-pointer">
			<option>1</option>
	</select> -->
	<v-checkbox label="Hello"></v-checkbox>
</template>
<style scoped>
	select option::-webkit-scrollbar {
		width: 4px;
		position: absolute;
		margin-right: 2px;
	}

	select option::-webkit-scrollbar-track {
		display: none;
	}

	select option::-webkit-scrollbar-thumb {
		background-color: #ACB2B7;
		border-radius: 4px;
		border: 3px solid #ACB2B7;
	}
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		background: transparent;
		background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
		background-repeat: no-repeat;
		background-position-x: 100%;
		background-position-y: 50%;
		border: 1px solid #dfdfdf;
		border-radius: 2px;
		margin-right: 2rem;
		padding: 1rem;
		padding-right: 2rem;
	}
</style>
	