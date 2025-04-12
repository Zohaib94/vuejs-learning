import { defineStore } from 'pinia';
import axios from 'axios';

type Company = {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
};

type Job = {
  id: Number;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: Company;
}

export const useJobsStore = defineStore('jobs', {
  // state
  state: () => ({
    jobs: [] as Job[],
    currentJob: {}
  }),
  // actions: to call at component level to update state
  actions: {
    async addJob(jobItem: Omit<Job, 'id'>) {
      try {
        const newItem = await axios.post('/api/jobs', jobItem);
        this.jobs.unshift(newItem.data);
      } catch (error) {
        throw error;
      }
    },
    async deleteJob(jobID: number) {
      try {
        this.jobs = this.jobs.filter((job) => job.id !== jobID);
        await axios.delete(`/api/jobs/${jobID}`);
      } catch (error) {
        throw error;
      }
    },
    async fetchJobs() {
      try {
        const response = await axios.get('/api/jobs');
        this.jobs = response.data;
      }
      catch (error) {
        throw error;
      }
    },
    async fetchJob(jobID: number) {
      this.currentJob = {};

      try {
        const response = await axios.get(`/api/jobs/${jobID}`);
        this.currentJob = response.data;
      }
      catch (error) {
        throw error;
      }
    },
    async updateJob() {
      try {
        const { id, ...updatedJob } = this.currentJob;
        const response = await axios.put(`/api/jobs/${id}`, updatedJob);

        this.jobs = this.jobs.map((job) => {
          if (job.id === response.data.id) {
            return response.data;
          }

          return job;
        });
      } catch (error) {
        throw error;
      }
    },
  }
})
