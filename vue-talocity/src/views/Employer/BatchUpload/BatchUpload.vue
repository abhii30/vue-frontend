<script setup>
import { EmployerDashboard } from '@/layouts'
import { ref, computed, onMounted } from 'vue'
import { Inputs } from '@talocityui/ui'
import { helpers } from '@talocityui/theme'
import SideBar from './sidebar/sidebar-view.vue'
import { useNavStore } from '@/stores/NavStore'
import { useBatchStore } from '@/stores/BatchStore'
import { useCompanyStore } from '@/stores/CompanyStore'

const CompanyStore = useCompanyStore()
const BatchStore = useBatchStore()
const NavStore = useNavStore()
const details = computed(() => CompanyStore.companyDetails)

const fadedColor = computed(() => helpers.fadeColor(CompanyStore?.companyDetails.background_color))
const placeholder = ref(['Search by batch name', 'Job Title', 'Date uploaded', 'Uploaded by'])
const searchKeys = ref({ batch_name: '', job_title: '', uploaded_time: '', uploaded_by: '' })
const itemsPerPage = 10
const headers = [
  {
    title: 'Batch Name',
    align: 'start',
    sortable: true,
    key: 'batch_name'
  },
  { title: 'Job ID', align: 'end', key: 'job_id' },
  { title: 'Job Title', align: 'end', key: 'job_title' },
  { title: 'Uploaded On', align: 'end', key: 'uploaded_time' },
  { title: 'Uploaded By', align: 'end', key: 'uploaded_by' }
]
const filteredBatches = computed(() =>
  BatchStore.allBatches?.filter((batch) => {
    if (batch.batch_name?.toLowerCase().search(searchKeys.value.batch_name.toLowerCase()) < 0) {
      return false
    }
    if (batch.job_title?.toLowerCase().search(searchKeys.value.job_title.toLowerCase()) < 0) {
      return false
    }
    if (
      batch.uploaded_time?.toLowerCase().search(searchKeys.value.uploaded_time.toLowerCase()) < 0
    ) {
      return false
    }
    if (batch.uploaded_by?.toLowerCase().search(searchKeys.value.uploaded_by.toLowerCase()) < 0) {
      return false
    }
    return true
  })
)
NavStore.setActiveTab('Batch Upload')
onMounted(async () => {
  await BatchStore.fetchBatches()
})
</script>
<template>
  <EmployerDashboard>
    <template #sidebar>
      <SideBar />
    </template>
    <template #main-content>
      <div class="flex-flex-col w-full">
        <div
          class="w-full main-content-header py-7 px-9 flex flex-col items-left justify-start gap-2"
          :style="{
            backgroundColor: fadedColor
          }"
        >
          <div class="company-logo h-full flex">All Batches</div>
          <Inputs.MultiSearch
            :placeholder="placeholder"
            v-model:name="searchKeys.batch_name"
            v-model:title="searchKeys.job_title"
            v-model:uploadedOn="searchKeys.uploaded_time"
            v-model:uploadedBy="searchKeys.uploaded_by"
            :bgColor="details?.background_color"
            :textColor="details?.text_color"
          />
        </div>
        <div class="flex flex-col my-5 mx-9 border border-[#DADCE0] pb-5 pt-1 px-6 rounded-lg">
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="filteredBatches"
            item-value="name"
            class="font-medium font-Inter text-sm"
          ></v-data-table>
        </div>
      </div>
    </template>
  </EmployerDashboard>
</template>
