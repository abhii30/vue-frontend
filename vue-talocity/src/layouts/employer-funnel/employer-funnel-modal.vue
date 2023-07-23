<script setup>
	import {ref, computed} from 'vue'
    import {Buttons,Modals,Inputs} from '@talocityui/ui'
	import {useNavStore} from '@/stores/NavStore'
    import {EmployerFunnel} from '@/layouts'    
    import {QuestionAnswerWrapper} from '@talocityui/wrappers'
	const NavStore = useNavStore();

	NavStore.setActiveFunnelSideBarTab("Screnning")
	const props = defineProps({
		showModal:{
			type:Boolean,
			default:false
		},
        heading: {
            type: String,
            default: 'Scorecard'
        },
        values: {
            type: Object,
            default: () => {}
        }
	})
	let changeShowModal = computed(()=> props.showModal);    
	// const Rounds =  ref([
	// 	"Round 1",
    //     "Round 2"
	// ])

    // const updatedRounds = computed(()=> Rounds.value)
    
    // const onClickTab = (tab) => {
  	// 	NavStore.setActiveJobSeekerScrenningTab(tab)
	// }	
    const choices = ['Domain Assessment', 'Typing Assessment', 'Voice Assessment', 'Video Assessment']
    const showAreYouSure = ref(false)
</script>

<template>
    <Modals.RightSideWindow v-model:show="changeShowModal" width="max-content">
        <template #body>
            <EmployerFunnel>
                <template #button>
                    <Buttons.Primary value="Allow another round" @click="showAreYouSure = true" ></Buttons.Primary>
                    <Modals.AreYouSure v-model:show="showAreYouSure" :choices="choices" />
                </template>
                <template #score-card>
                 
                </template>

                <template #main-content>
                
            
                </template>
            </EmployerFunnel>
        </template>
    </Modals.RightSideWindow>
</template>
