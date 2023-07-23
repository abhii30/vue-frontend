<script setup>
import { ref } from 'vue'
import { EmployerProfile } from '@/layouts'
import { Buttons, Modals, Inputs } from '@talocityui/ui'
import { DownloadIcon, AddIconBig } from '@talocityui/icons'
import { useNavStore } from '@/stores/NavStore'
import { AccessManagementWrapper } from '@talocityui/wrappers'
const NavStore = useNavStore()
NavStore.setActiveProfileSideBarTab('Access Management')
const sideTabs = ['Super Admin', 'Admin', 'Read Access']
const roleType = ['Recruiter', 'Admin', 'Read Access']
const profiles = ref([
  {
    name: 'John Doe',
    jobsHandled: 10,
    addedOn: '12/12/2020',
    addedBy: 'John Doe'
  },
  {
    name: 'Ashish',
    jobsHandled: 10,
    addedOn: '12/12/2020',
    addedBy: 'John Doe'
  }
])
const addProfile = ref(false)
const deleteProfile = (index) => {
  profiles.value.splice(index, 1)
}
</script>
<template>
  <EmployerProfile>
    <template #action-button>
      <div class="flex gap-3">
        <Buttons.Secondary
          :icon="true"
          value="Download List"
          @click="
            $router.push({
              name: 'editEmployerProfileAccessManagement'
            })
          "
        >
          <template #icon>
            <DownloadIcon />
          </template>
        </Buttons.Secondary>

        <Buttons.Primary :icon="true" value="Add User" @click="addProfile = true">
          <template #icon>
            <AddIconBig />
          </template>
        </Buttons.Primary>
      </div>
    </template>
    <template #access-management>
      <div class="company-role h-full flex justify-center items-baseline gap-2">
        <p class="font-medium text-base leading-7">Manage your team</p>
        <span class="text-xs font-medium leading-5 text-talocity-blue-color cursor-pointer"
          >View Role Reference</span
        >
      </div>
    </template>
    <template #main-content>
      <Modals.RightSideWindow :show="addProfile" width="30%">
        <template #body>
          <div class="flex flex-col gap-6 mx-9 font-Inter">
            <div class="text-xl font-semibold leading-6">Add User</div>
            <div class="flex items-center">Acess</div>
            <div class="flex flex-col gap-6 text-sm font-medium">
              <Inputs.DropDown
                label="Role"
                :choices="roleType"
                v-model:selected="department"
                :required="true"
                :filterOptions="false"
              />
              <Inputs.TextField label="Name" :required="true" />
              <Inputs.TextField label="Email" :required="true" />
              <Inputs.TextField label="Contact" />
            </div>
            <div class="flex flex-row gap-3 justify-end">
              <Buttons.Secondary value="Cancel" @action="addProfile = false"> </Buttons.Secondary>
              <Buttons.Primary value="Submit"> </Buttons.Primary>
            </div>
          </div>
        </template>
      </Modals.RightSideWindow>
      <div class="main relative w-full">
        <div class="absolute top-[-80px] tab-nav-buttons">
          <div class="flex">
            <div
              class="nav-pill cursor-pointer w-full"
              v-for="(tab, index) in sideTabs"
              @click="onClickTab(tab)"
              :key="`tab-${index}`"
            >
              <Buttons.Tab
                :value="tab"
                :isActive="NavStore.activeProfileAccessNavTab === tab"
                :color="details?.background_color"
              />
            </div>
          </div>
        </div>

        <div class="table w-full">
          <v-table class="font-Inter text-sm text-base-color font-medium">
            <thead>
              <tr>
                <th class="table-head">Name</th>
                <th class="table-head text-center">Jobs handled</th>
                <th class="table-head">Added on</th>
                <th class="table-head">Added by</th>
                <th class="table-head text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AccessManagementWrapper
                v-for="(profile, index) in profiles"
                :key="`profile` + index"
                :profile="profile"
                @action-delete="deleteProfile(index)"
              />
            </tbody>
            <button></button>
          </v-table>
        </div>
      </div>
    </template>
  </EmployerProfile>
</template>

<style scoped>
.table-head {
  color: #001325 !important;
}
</style>
