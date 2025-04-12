<script setup>
  // Composition API
  import { ref, onMounted } from 'vue';

  // ref is similar to useState in react
  // ref is needed so data changes can update dom accordingly
  // otherwise const are static and do not change the dom
  const name = ref('John Doe');
  const status = ref('active');
  const tasks = ref(['t1', 't2', 't3']);
  
  const newTaskStateVar = ref('');

  const toggleStatus = () => {
    if (status.value === 'active') {
      status.value = 'pending'
    } else if (status.value === 'pending') {
      status.value = 'inactive'
    } else {
      status.value = 'active'
    }
  }

  const addTask = () => {
    if (newTaskStateVar.value.trim() !== '') {
      tasks.value.push(newTaskStateVar.value);
      newTaskStateVar.value = '';
    }
  }

  const deleteTask = (index) => {
    tasks.value.splice(index, 1);
  }

  onMounted(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      tasks.value = data.map((task) => task.title);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  })
</script>

<template>
  <h1>{{ name }}</h1>
  <!-- If Else in Vue.js -->
    <p v-if="status === 'active'">User is active</p>
    <p v-else-if="status === 'pending'">User is pending</p>
    <p v-else>User is inactive</p>
  <!-- If Else in Vue.js -->

  <!-- .prevent === .preventDefault -->
  <form action="" @submit.prevent="addTask">
    <label for="newTask">Add Task</label>
    <input type="text" id="newTask" v-model="newTaskStateVar"></input>
    <button type="submit">Submit</button>
  </form>
  
  <!-- List rendering in vue.js -->
    <h3>Tasks</h3>
    <ul>
      <li v-for="(task, index) in tasks" :key="task">
        <span>{{ task }}</span>
        <span><button @click="deleteTask(index)">X</button></span>
      </li>
    </ul>
  <!-- List rendering in vue.js -->

  <!-- Event handling -->
    <button @click="toggleStatus">Change Status</button>
  <!-- Event handling -->
</template>

<!-- Scope only for this component -->
<style scoped>
</style>