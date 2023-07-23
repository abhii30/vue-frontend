<script setup>
import { EmployerProfile } from '@/layouts'
import { Buttons, ColorPickers, Uploads } from '@talocityui/ui'
import { useNavStore } from '@/stores/NavStore'
import { computed, watch, ref } from 'vue'
import { useCompanyStore } from '@/stores/CompanyStore'

import { useAlertStore } from '@/stores/AlertStore'

const AlertStore = useAlertStore()
const NavStore = useNavStore()
NavStore.setActiveProfileSideBarTab('Customise')

const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)

const pageBackgroundColor = ref(details.value.background_color)
const pageTextColor = ref(details.value.text_color)

const file = ref([])

const updateCompanyDetails = async () => {
  const updateColors = async () => {
    const res = await CompanyStore.putCompanyDetails({
      ...details.value,
      background_color: pageBackgroundColor.value,
      text_color: pageTextColor.value
    })
    if (res?.status == 'Success') {
      AlertStore.showAlert(res?.message, 5000)
    }
  }
  if (file.value.length > 0) {
    const fd = new FormData()
    fd.append('id', details.value.id), fd.append('file', file.value[0])
    const res = await CompanyStore.uploadLogo(details.value.id, fd)
    if (res.status == 200) {
      console.log(res.status)
      file.value = []
      updateColors()
    }
  } else {
    updateColors()
    console.log(file.value.length)
  }
}

watch(details, () => {
  pageBackgroundColor.value = details.value.background_color
  pageTextColor.value = details.value.text_color
})
</script>

<template>
  <EmployerProfile>
    <template #main-content>
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <span class="text-sm font-semibold font-Inter">Upload Logo</span>
          <Uploads.DragAndDrop
            :textColor="CompanyStore.companyDetails?.background_color"
            v-model:file="file"
            :accept="['.png', '.jpg', '.svg']"
          />
        </div>
        <ColorPickers.Default
          :textColor="CompanyStore.companyDetails?.background_color"
          v-model:selectedColor="pageBackgroundColor"
          colorWrapperName="Background/Primary Color"
          placeholder="#10CCCB"
          defaultValue="#10CCCB"
        />
        <ColorPickers.Default
          :textColor="CompanyStore.companyDetails?.background_color"
          v-model:selectedColor="pageTextColor"
          colorWrapperName="Text Color"
          placeholder="#FFFFFF"
          defaultValue="#FFFFFF"
        />
        <ColorPickers.PreviewPanel
          :pageBackgroundColor="pageBackgroundColor"
          :pageTextColor="pageTextColor"
        />
        <div class="customise-submit flex justify-end">
          <Buttons.Primary
            :textColor="CompanyStore.companyDetails?.text_color"
            :bgColor="CompanyStore.companyDetails?.background_color"
            value="Save Changes"
            @click="updateCompanyDetails"
          ></Buttons.Primary>
        </div>
      </div>
    </template>
  </EmployerProfile>
</template>
