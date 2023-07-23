import { defineStore } from 'pinia'
import axios from 'axios'
export const useCompanyStore = defineStore('CompanyStore', {
  state: () => ({
    companyDetails: {}
  }),
  actions: {
    async fetchCompanyDetails(company_id) {
      try {
        const res = await fetch(`http://13.233.216.158:8001/details/?recruiter_id=${company_id}`)
        const json = await res.json()
        this.companyDetails = json.data
        console.log(this.companyDetails)
      } catch (err) {
        console.log(err)
      }
    },
    async putCompanyDetails(company_details) {
      const res = await fetch(`http://13.233.216.158:8001/details/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company_details)
      })
      const json = await res.json()
      if (json.status === 'Success') {
        this.companyDetails = {
          ...this.companyDetails,
          ...json.data
        }
      }
      return json
    },
    async uploadLogo(id, logoData) {
      const res = await axios.put('http://13.233.216.158:8001/logo/', logoData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.companyDetails.logo_url = ''
      this.fetchCompanyDetails(id)
      return res
    }
  }
})
