<script setup>
	import {ref, computed} from 'vue'
    import {Buttons,Inputs,Player} from '@talocityui/ui'
	import {useNavStore} from '@/stores/NavStore'
    import {EmployerFunnel} from '@/layouts'
    import {Modals} from '@talocityui/ui'
    import {QuestionAnswerWrapper} from '@talocityui/wrappers'

	const NavStore = useNavStore();
	
	// AlertStore.showAlert("Errror MessaGE",2000)
	NavStore.setActiveFunnelSideBarTab("Voice Assessment")
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
	const Rounds =  ref([
		"Read & Repeat",
        "Listen & Repeat",
        "Speak the missing word/phrase",
        "Re-arrange & Speak"
	])

    const updatedRounds = computed(()=> Rounds.value)
    
    const onClickTab = (tab) => {
  		NavStore.setActiveJobSeekerScrenningTab(tab)
	}	
    const showAreYouSure = ref(false)
    const choices = ['Domain Assessment', 'Typing Assessment', 'Voice Assessment', 'Video Assessment']
</script>

<template>
    <!-- <Modals.RightSideWindow v-model:show="changeShowModal" width="90%">
        <template #body> -->
            <EmployerFunnel>
                <template #button>
                    <Buttons.Primary value="Allow another round" @click="showAreYouSure = true" ></Buttons.Primary>
                    <Modals.AreYouSure v-model:show="showAreYouSure" :choices="choices" />
                </template>
                <template #score-card>
                    <div class="min-w-[256px] p-4 rounded-lg bg-[#F5F5F7] font-Inter">
                        <div class="text-base leading-7">{{ heading }}</div>
                        <div class="border-t-2 my-[11px]"></div>
                        <div class="flex flex-col gap-6">
                        <div v-for="(value, index) in values" :key="index" class="flex flex-col gap-1">
                            <div class="text-sm font-medium">{{ value.label }}</div>
                            <div class="text-sm font-normal">{{ value.value }}</div>
                        </div>
                     </div>
                    </div>
                </template>

                <template #main-content>
                    <div class="flex flex-col w-full">

                        <div class="flex" :style="{'min-width':(128*updatedRounds.length)+'px'}">
                            <div
                                class="nav-pill cursor-pointer w-full"
                                v-for="(tab, index) in updatedRounds"
                                @click="onClickTab(tab)"
                                :key="`tab-${index}`"
                                >
                                <Buttons.Tab
                                :value="tab"
                                :isActive="NavStore.activeJobSeekerVoiceTab === tab"
                                :color="details?.background_color"
                                />
                            </div>
                        </div>
                        <p class="text-xs leading-[18px] font-Inter font-normal py-4">5 Questions | 0 UMCs | Time taken - 00:02:40</p>
                        <template v-for="round in updatedRounds" :key="round">
                            <template v-if="NavStore.activeJobSeekerVoiceTab === round">
                                <QuestionAnswerWrapper>Are you willing to work for pantaloons?</QuestionAnswerWrapper>
                                <QuestionAnswerWrapper type="answer">   <Player.AudioPlayer /></QuestionAnswerWrapper>
                            </template>
                        </template>

                </div>
            
                </template>
            </EmployerFunnel>
        </template>
    <!-- </Modals.RightSideWindow>
</template> -->
