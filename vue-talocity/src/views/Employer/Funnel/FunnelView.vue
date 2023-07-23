<script setup>
import { EmployerDashboard } from '@/layouts'
import { ref, computed, onMounted } from 'vue'
import { Inputs,Buttons } from '@talocityui/ui'
import { helpers } from '@talocityui/theme'
import SideBar from './sidebar/side-view.vue'
import { useNavStore } from '@/stores/NavStore'
import { useBatchStore } from '@/stores/BatchStore'
import { useCompanyStore } from '@/stores/CompanyStore'
import { Search } from '@talocityui/icons'
import SourcedModal from './Modals/sourced-modal.vue'
import JobSeekerCardModal from './Modals/job-seeker-card.vue'
import ProfileFunnelView from './Modals/Profile/profile-view.vue'
import ScrenningFunnelView from './Modals/Screnning/screnning-view.vue'
import DomainFunnelView from './Modals/Domain/domain-assessment-view.vue'
import TypingFunnelView from './Modals/Typing/typing-assessment.vue'
import VoiceFunnelView from './Modals/Voice/voice-assessment.vue'
import VideoFunnelView from './Modals/Video/video-assessment.vue'
const CompanyStore = useCompanyStore()
const BatchStore = useBatchStore()
const NavStore = useNavStore()
const details = computed(() => CompanyStore.companyDetails)
const showSourcedModal = ref(false)
const showUserModal = ref(false)

const fadedColor = computed(() => helpers.fadeColor(CompanyStore?.companyDetails.background_color))


const choices = [
  'Last 7 days',
  'Last 30 days',
  'Last 45 days',
  'Last 60 days',
  'Last 90 days'
]
// const choices = [
//   ['Last 7 days',true],
//   ['Last 30 days',false],
//   ['Last 45 days',false],
//   ['Last 60 days',false],
//   ['Last 90 days',false]
// ]

const screnningScorecard = ref([
  {
    label: 'Assessment Name',
    value: 'Quick CTQ'
  },
  {
    label: 'Test taken on',
    value: '24 Feb, 2023 | 2:42 PM'
  },
  {
    label: 'Score in %',
    value: '100'
  },
  {
    label: 'Grade point',
    value: '5.0/5'
  },
  {
    label: 'Time allocated',
    value: '00:03:00'
  },
  {
    label: 'Time taken',
    value: '00:02:00'
  },
  {
    label: 'UMCs',
    value: '0'
  }
])

const domainScorecard = ref([
  {
    label: 'Assessment Name',
    value: 'Quick CTQ'
  },
  {
    label: 'Test taken on',
    value: '24 Feb, 2023 | 2:42 PM'
  },
  {
    label: 'Score in %',
    value: '100'
  },
  {
    label: 'Grade point',
    value: '5.0/5'
  },
  {
    label: 'Time allocated',
    value: '00:03:00'
  },
  {
    label: 'Time taken',
    value: '00:02:00'
  },
  {
    label: 'UMCs',
    value: '0'
  }
])

const typingScorecard = [
  {
    label: 'Overall Score',
    value: '12.61'
  },
  {
    label: 'Speed (WPM)',
    value: '13.3'
  },
  {
    label: 'Speed Alias',
    value: 'Slow'
  },
  {
    label: 'Accuracy',
    value: '94.81'
  },
  {
    label: 'Lines Typed',
    value: '1'
  },
  {
    label: 'Start Time',
    value: '28 Feb, 2023 | 9:03 AM'
  },
  {
    label: 'End Time',
    value: '28 Feb, 2023 | 9:04 AM'
  },
  {
    label: 'UMCs',
    value: '0'
  }
]

const voiceScorecard = [
  {
    label: 'Talocity Score in %',
    value: '50.31'
  },
  {
    label: 'CEFR Score',
    value: 'B1'
  },
  {
    label: 'IELTS Score',
    value: 'Slow'
  },
  {
    label: 'Total UMCs',
    value: '0'
  },
  {
    label: 'Read & Repeat',
    value: '94.61%'
  },
  {
    label: 'Listen & Repeat',
    value: '28.45%'
  },
  {
    label: 'Speak the missing word/ phrase',
    value: '22.34%'
  },
  {
    label: 'Re-arrange & Speak',
    value: '65.84%'
  },
  {
    label: 'Comprehension Passage',
    value: '22.34%'
  }
]


const videoScorecard = [
  {
    label: 'Talocity Score in %',
    value: '50.31'
  },
  {
    label: 'Test Taken on ',
    value: '28 Feb, 2023 | 9:03 AM'
  }
]

NavStore.setActiveTab('Funnel')
// onMounted(async () => {
//   await BatchStore.fetchBatches()
// })
</script>
<template>
  <EmployerDashboard>
    <template #sidebar>
      <SideBar />
    </template>
    <template #main-content>
      <div class="flex-flex-col w-full">
        <div
          class="w-full main-content-header py-7 px-9 flex justify-between"
          :style="{
            backgroundColor: 'rgba(16, 204, 203, 0.08)'
          }"
        >
          <div class="company-logo h-full flex items-baseline">
            <span class="job-profile text-xl leading-10 font-medium py-0">Sales Executive</span>
            <span class="job-location text-sm leading-10 font-medium py-0">, Mumbai</span>
          </div>
          <div class="flex justify-center items-center gap-3">
            <Inputs.TextField
                placeholder="Search applicants"
                :icon="true"
              >
              <template #icon>
                <Search/>
              </template>
			      </Inputs.TextField>
            <div class="w-[220px]">
              <Inputs.SortDropDown :choices="choices" placeholder="Sort by Date" />
            </div>
          </div>
        </div>
        <div class="flex flex-col my-5 mx-9 border border-[#DADCE0] pb-5 pt-1 px-6 rounded-lg">

          <button @click="showSourcedModal = true">Sourced</button>
<!-- 
          <SourcedModal :showModal="showSourcedModal" />
          {{ showSourcedModal }} -->

          <Buttons.Primary @click="showUserModal = true" value="User Profile"></Buttons.Primary>
          <!-- <Buttons.Primary @click="showUserModal = true, $router.push({ name: 'employerFunnelSeeker'})" value="User Profile"></Buttons.Primary> -->
          <!-- <JobSeekerCardModal :showModal="showUserModal" /> -->
          <ProfileFunnelView :showModal="showUserModal" />
          <!-- <ScrenningFunnelView :showModal="showUserModal" :values="screnningScorecard"/> -->
          <!-- <DomainFunnelView :showModal="showUserModal" :values="domainScorecard"/> -->
          <!-- <TypingFunnelView :showModal="showUserModal" :values="typingScorecard"/> -->
          <!-- <VoiceFunnelView :showModal="showUserModal" :values="voiceScorecard"/> -->
          <!-- <VideoFunnelView :showModal="showUserModal" :values="videoScorecard">
            <template #personality-report>
              <div class="flex flex-col gap-6">
                <div class="flex flex-col">
                      <div class="text-sm font-medium">Personality Report</div>
                      <div class="text-xs font-normal text-secondary-color">Quick download</div>
                </div>
              </div>
            </template>
          </VideoFunnelView> -->
          {{ showUserModal }}
          <Modals.RightSideWindow v-model:show="showUserModal" width="max-content">
            <template #body>
              
            </template>
          </Modals.RightSideWindow>
        </div>
      </div>
    </template>
  </EmployerDashboard>
</template>
