<script setup>
import { ref, computed } from 'vue'
import { EmployerProfile } from '@/layouts'
import { Buttons, Inputs } from '@talocityui/ui'
import { useNavStore } from '@/stores/NavStore'
import { LinkedinIcon, FacebookIcon, TwitterIcon, YoutubeIcon, LinkIcon } from '@talocityui/icons'
import { useCompanyStore } from '@/stores/CompanyStore'
import { useAlertStore } from '@/stores/AlertStore'
const AlertStore = useAlertStore()

const NavStore = useNavStore()
NavStore.setActiveProfileSideBarTab('Social')

const CompanyStore = useCompanyStore()
const details = computed(() => CompanyStore.companyDetails)

const linkedIn = ref(details.value?.linkedin_profile),
  facebook = ref(details.value?.facebook_profile),
  twitter = ref(details.value?.twitter_profile),
  youtube = ref(details.value?.youtube_profile),
  link = ref(details.value?.link),
  career = ref(details.value?.career_page_link)

const updateCompanyDetails = async () => {
  const res = await CompanyStore.putCompanyDetails({
    ...details.value,
    linkedin_profile: linkedIn.value,
    facebook_profile: facebook.value,
    twitter_profile: twitter.value,
    youtube_profile: youtube.value,
    link: link.value
  })
  if (res?.status == 'Success') {
    AlertStore.showAlert(res?.message, 5000)
  }
}
</script>
<template>
  <EmployerProfile>
    <template #action-button>
      <Buttons.Secondary
        value="Cancel"
        @click="
          $router.push({
            name: 'employerProfileSocial'
          })
        "
      />
    </template>
    <template #main-content>
      <div class="edit-job-content-body flex flex-col gap-6">
        <Inputs.TextField label="LinkedIn" labelIcon="true" v-model:value="linkedIn" :color="details?.background_color" >
          <template #labelIcon>
            <LinkedinIcon />
          </template>
        </Inputs.TextField>
        <Inputs.TextField label="Facebook" labelIcon="true" v-model:value="facebook" :color="details?.background_color" >
          <template #labelIcon>
            <FacebookIcon />
          </template>
        </Inputs.TextField>
        <Inputs.TextField label="Twitter" labelIcon="true" v-model:value="twitter" :color="details?.background_color" >
          <template #labelIcon>
            <TwitterIcon />
          </template>
        </Inputs.TextField>
        <Inputs.TextField label="Youtube" labelIcon="true" v-model:value="youtube" :color="details?.background_color" >
          <template #labelIcon>
            <YoutubeIcon />
          </template>
        </Inputs.TextField>
        <Inputs.TextField label="Add Link" labelIcon="true" v-model:value="link" :color="details?.background_color">
          <template #labelIcon>
            <LinkIcon />
          </template>
        </Inputs.TextField>
        <Inputs.TextField label="Career Page" v-model="career" :color="details?.background_color"/>
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
