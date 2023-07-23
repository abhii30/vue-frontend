import { defineStore } from 'pinia'
import axios from 'axios'
export const useBatchStore = defineStore('BatchStore', {
  state: () => ({
    allBatches: []
  }),
  actions: {
    async fetchBatches() {
      const res = await fetch(`http://52.66.224.33:9000/api/batchs/`)
      const json = await res.json()
      this.allBatches = json
        .sort((a, b) => new Date(b.uploaded_time).getTime() - new Date(a.uploaded_time).getTime())
        .map((batch) => ({
          ...batch,
          uploaded_time: this.dateFormat(new Date(batch.uploaded_time))
        }))
    },
    dateFormat(date) {
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
      const [month, day, year] = date.toLocaleDateString('en-US', options).split(' ')
      return `${day.replace(',', '')} ${month}, ${year}`
    },
    async postBatch(formData) {
      const res = await axios.post('http://52.66.224.33:9000/api/batchs/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.fetchBatches()
      return res
    }
  }
})
