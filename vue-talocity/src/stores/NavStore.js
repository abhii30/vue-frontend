import { defineStore } from 'pinia'

export const useNavStore = defineStore('NavStore', {
  state: () => ({
    navButtons: [
      {
        title: 'Jobs',
        link: 'employerJobs'
      },
      {
        title: 'Funnel',
        link: 'employerFunnel'
      },
      {
        title: 'Batch Upload',
        link: 'employerBatchUpload'
      },
      {
        title: 'Company Profile',
        link: 'employerProfile'
      }
    ],
    activeJobTab: 'Overview',
    activeJobScreen: 1,
    activeTab: 'Jobs',
    activeSideBarTab: 'Drafts',
    activeProfileSideBarTab: 'Overview',
    activeProfileAccessNavTab: 'Super Admin',
    activeSourcedFunnelTab: 'Direct',
    activeJobSeekerFunnelTab: 'Basic Details',
    activeJobSeekerScrenningTab: 'Round 1',
    activeJobSeekerVoiceTab: 'Read & Repeat',
    activeFunnelSideBarTab: 'Profile'
  }),
  actions: {
    setActiveTab(tab) {
      this.activeTab = tab
    },
    setActiveJobTab(tab) {
      this.activeJobTab = tab
    },
    setActiveSideBarTab(tab) {
      this.activeSideBarTab = tab
    },
    setActiveProfileSideBarTab(tab) {
      this.activeProfileSideBarTab = tab
    },
    setActiveProfileAccessNavTab(tab) {
      this.activeProfileAccessNavTab = tab
    },
    setActiveSourcedFunnelTab(tab){
      this.activeSourcedFunnelTab = tab;
    },
    setActiveJobSeekerFunnelTab(tab){
      this.activeJobSeekerFunnelTab = tab;
    },
    setActiveFunnelSideBarTab(tab){
      this.activeFunnelSideBarTab = tab;
    },
    setActiveJobSeekerScrenningTab(tab){
      this.activeJobSeekerScrenningTab = tab;
    },
    setActiveJobSeekerVoiceTab(tab){
      this.activeJobSeekerVoiceTab = tab;
    },
  }
})
