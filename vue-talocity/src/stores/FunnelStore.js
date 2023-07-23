import { defineStore } from 'pinia'

export const useFunnelStore = defineStore('FunnelStore', {
  state: () => ({
    jobs: [],
    activeJob: {},
    
  }),
  actions: {

  }
})
