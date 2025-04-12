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
        this.todoList.unshift(newItem.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async deleteJob(jobID: number) {
      this.jobs = this.todoList.filter((todoItem) => todoItem.id !== jobID);

      try {
        await axios.delete(`/api/jobs/${jobID}`);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchJobs() {
      try {
        const response = await axios.get('/api/jobs');
        this.jobs = response.data;
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async fetchJob(jobID: number) {
      this.currentJob = {};

      try {
        const response = await axios.get(`/api/jobs/${jobID}`);
        this.currentJob = response.data;
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async updateJob(jobId: number, updatedJob: Omit<Job, "id">) {
      try {
        const response = await axios.put(`/api/jobs/${jobId}`, updatedJob);

        this.jobs = this.jobs.map((job) => {
          if (job.id === response.data.id) {
            return response.data;
          }

          return job;
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  }
})
