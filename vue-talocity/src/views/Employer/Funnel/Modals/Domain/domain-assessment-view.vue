<script setup>
	import {ref, computed} from 'vue'
    import {Buttons,Inputs} from '@talocityui/ui'
	import {useNavStore} from '@/stores/NavStore'
    import {EmployerFunnel} from '@/layouts'
    import {Modals} from '@talocityui/ui'
    import { QuestionAnswerWrapper } from '@talocityui/wrappers'
	const NavStore = useNavStore();
	
	// AlertStore.showAlert("Errror MessaGE",2000)
	NavStore.setActiveFunnelSideBarTab("Domain Assessment")
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
		"Round 1",
        "Round 2"
	])
    const questionMarks = ref([
        '2 Marks Qs',
        '5 Marks Qs',
        '10 Marks Qs'
    ])
    const updatedRounds = computed(()=> Rounds.value)
    
    const onClickTab = (tab) => {
  		NavStore.setActiveJobSeekerScrenningTab(tab)
	}	
</script>

<template>
    <Modals.RightSideWindow v-model:show="changeShowModal" width="80%">
        <template #body>
            <EmployerFunnel>
                <template #button>
                    <Buttons.Primary value="Add another round" ></Buttons.Primary>
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

                        <div class="flex" :style="{'max-width':(128*updatedRounds.length)+'px'}">
                            <div
                                class="nav-pill cursor-pointer w-full"
                                v-for="(tab, index) in updatedRounds"
                                @click="onClickTab(tab)"
                                :key="`tab-${index}`"
                                >
                                <Buttons.Tab
                                :value="tab"
                                :isActive="NavStore.activeJobSeekerScrenningTab === tab"
                                :color="details?.background_color"
                                />
                            </div>
                        </div>

                        <template v-for="round in updatedRounds" :key="round">
                            <template v-if="NavStore.activeJobSeekerScrenningTab === round">
                                <div class="flex gap-2 pt-3 pb-5">
                                    <Buttons.ToggleButton v-for="questionMark in questionMarks" :value="questionMark" :key="questionMark" />
                                </div>
                                <QuestionAnswerWrapper value="Are you willing to work for pantaloons?"/>
                            </template>
                        </template>

                </div>
            
                </template>
            </EmployerFunnel>
        </template>
    </Modals.RightSideWindow>
</template>
