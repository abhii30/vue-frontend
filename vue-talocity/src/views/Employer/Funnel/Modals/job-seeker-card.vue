<script setup>
	import {ref, computed} from 'vue'
    import {Buttons,Inputs} from '@talocityui/ui'
	import {useNavStore} from '@/stores/NavStore'
    import {EmployerFunnel} from '@/layouts'
    import {Modals} from '@talocityui/ui'
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
		"Basic Details",
        "Resume",
        'Comments'
	]
	const onClickTab = (tab) => {
  		NavStore.setActiveJobSeekerFunnelTab(tab)
	}	

    const stage = ['Domain Assessment', 'Typing Assessment', 'Voice Assessment', 'Video Assessment']
    const changedStage = ref('Domain Assessment')       
</script>

<template>
    <Modals.RightSideWindow v-model:show="changeShowModal" width="50%">
        <template #body>
            <EmployerFunnel>
                <template #dropdown>
                    <Inputs.DropDown
                        label="Change Stage"
                        :choices="stage"
                        v-model:selected="changedStage"
                        class="mt-3 mb-4 w-full"
                        :color="details?.background_color"
                    />
                </template>

                <template #main-content>
                    <div
                        class="nav-pill cursor-pointer w-full"
                        v-for="(tab, index) in sideTabs"
                        @click="onClickTab(tab)"
                        :key="`tab-${index}`"
                        >
                        <Buttons.Tab
                        :value="tab"
                        :isActive="NavStore.activeJobSeekerFunnelTab === tab"
                        :color="details?.background_color"
                        />
                    </div>
                </template>
            </EmployerFunnel>
        </template>
    </Modals.RightSideWindow>
</template>
