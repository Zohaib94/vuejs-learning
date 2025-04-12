<script>
  export default {
  //  Options API
    data() {
      return {
        name: 'John Doe',
        status: 'active',
        tasks: ['t1', 't2', 't3'],
        link: 'https://www.google.com'
      }
    },
    methods: {
      toggleStatus() {
        if (this.status === 'active') {
          this.status = 'pending'
        } else if (this.status === 'pending') {
          this.status = 'inactive'
        } else {
          this.status = 'active'
        }
      }
    }
  }
</script>

<template>
  <h1>{{ name }}</h1>
  <!-- If Else in Vue.js -->
    <p v-if="status === 'active'">User is active</p>
    <p v-else-if="status === 'pending'">User is pending</p>
    <p v-else>User is inactive</p>
  <!-- If Else in Vue.js -->
  
  <!-- List rendering in vue.js -->
    <h3>Tasks</h3>
    <ul>
      <li v-for="task in tasks" :key="task">
        {{ task }}
      </li>
    </ul>
  <!-- List rendering in vue.js -->

  <!-- binding component properties to data -->
    <a v-bind:href="link">Click to go to google</a>
    <br />
    <a :href="link">Click to go to google</a>
  <!-- binding component properties to data -->

  <!-- Event handling -->
    <br />
    <button v-on:click="toggleStatus">Change Status</button>
    <br />
    <button @click="toggleStatus">Change Status</button>
  <!-- Event handling -->
</template>

<!-- Scope only for this component -->
<style scoped>
</style>