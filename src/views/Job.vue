<script setup>
  import { reactive, onMounted } from 'vue'
  import { useRoute, RouterLink, useRouter } from 'vue-router'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import BackButton from '@/components/BackButton.vue'
  import { useToast } from 'vue-toastification'
  import { useJobsStore } from '@/stores/jobs'

  const route = useRoute();
  const router = useRouter();
  const toast = useToast();
  const store = useJobsStore();

  const jobId = route.params.id;

  const state = reactive({
    isLoading: true,
  });

  onMounted(async () => {
    try {
      await store.fetchJob(jobId);
    } catch (error) {
      alert(error);
      console.log('Error fetching job', error);
    } finally {
      state.isLoading = false;
    }
  });

  const handleDeleteJob = async () => {
    try {
      await store.deleteJob(jobId);
      toast.success('Job deleted');
      router.push('/jobs');
    } catch (error) {
      console.log(error);
      toast.failure('error deleting job');
    }
  }
</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ store.currentJob.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ store.currentJob.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i
                class="pi pi-map-marker text-xl text-orange-700 mr-2"
              ></i>
              <p class="text-orange-700">{{ store.currentJob.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ store.currentJob.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ store.currentJob.salary }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ store.currentJob.company.name }}</h2>

            <p class="my-2">
              {{ store.currentJob.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ store.currentJob.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">{{ store.currentJob.company.contactPhone }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="`/jobs/edit/${store.currentJob.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</RouterLink>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              @click.stop="handleDeleteJob"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
  <div v-else class="text-center text-gray-500 py-6"><PulseLoader /></div>
</template>