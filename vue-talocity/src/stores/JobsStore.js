import { defineStore } from 'pinia'

export const useJobsStore = defineStore('JobsStore', {
  state: () => ({
    jobs: [],
    activeJob: {},
    createdTempJob: {
      crc: {
        compulsory: [
          { title: 'Name', enable: true, mandatory: true, sources: 'Free Text' },
          { title: 'Email Address', enable: false, mandatory: false, sources: 'Free Text' },
          { title: 'Reference Source', enable: false, mandatory: false, sources: [] },
          { title: 'Employee Reference ID', enable: false, mandatory: false, sources: 'Free Text' },
          { title: 'Current City', enable: false, mandatory: false, sources: 'City Names' },
          { title: 'Valid Photo ID', enable: false, mandatory: false, sources: 'Free Text' },
          { title: 'Store Code', enable: false, mandatory: false, sources: 'Free Text' },
          { title: 'Store Name', enable: false, mandatory: false, sources: 'Text Only' },
          { title: 'Resume', enable: false, mandatory: false, sources: 'File(.pdf, .docx, .jpg)' }
        ],
        custom: []
      }
    }
  }),
  actions: {
    async fetchJobs() {
      try {
        const res = await fetch('http://52.66.224.33:8000/api/jobs/')
        const jobs = await res.json()
        this.jobs = jobs.filter((job) => !job.is_deleted)
      } catch (err) {
        return
      }
    },
    async fetchJob(id) {
      try {
        this.activeJob = {}
        const res = await fetch(`http://52.66.224.33:8000/api/jobs/?id=${id}`)
        const jobs = await res.json()
        const job = jobs[0]
        if (!job.is_deleted) {
          this.activeJob = job
        } else {
          this.activeJob = {}
        }
      } catch (err) {
        this.activeJob = {}
      }
    },
    async postJob(job) {
      const res = await fetch(`http://52.66.224.33:8000/api/jobs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
      })
      const json = await res.json()
      if (json.status === 'passed') {
        this.fetchJobs()
        this.fetchJob(json.id)
      }
      return json
    },
    addTempJob() {
      this.jobs.push(this.createdTempJob)
      this.createdTempJob = {}
    },
    async deleteJob(job) {
      const res = await fetch(`http://52.66.224.33:8000/api/jobs/?id=${job._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      const json = await res.json()
      if (json.status === 'passed') {
        this.activeJob = {}
        this.fetchJobs()
      }
      return json
    },
    async putJob(newJob) {
      const res = await fetch(`http://52.66.224.33:8000/api/jobs/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      })
      const json = await res.json()
      if (json.status === 'passed') {
        this.fetchJobs()
        this.fetchJob(newJob._id)
      }
      return json
    },
    updateJob(job) {
      let id = job._id
      let index = this.jobs.findIndex((job) => job._id === id)
      this.jobs[index] = job
    },
    async cloneJob(job) {
      let { _id, ...restJob } = job
      restJob.status = 'Drafts'
      restJob.is_starred = false
      const res = await this.postJob(restJob)
      return res
    }
  }
})
