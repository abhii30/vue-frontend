import { defineStore } from 'pinia'

export const useAlertStore = defineStore('AlertStore', {
  state: () => ({
    showPrompt: false,
    alertMessage: '',
    alertCallToActionLabel: '',
    alertCallToAction: () => {}
  }),
  actions: {
    showAlert(message, delay, callToActionString, callToAction) {
      if (delay) {
        setTimeout(() => {
          this.showPrompt = false
        }, delay)
      }
      this.showPrompt = true
      this.alertMessage = message
      this.alertCallToActionLabel = callToActionString
      this.alertCallToAction = callToAction
    }
  }
})
