<template>
  <div id="app">
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      count: null,
      error: null
    };
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://countbooks-e4zgglhr6q-uc.a.run.app');
        this.count = response.data.count;
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.error = error;
        this.count = null;
      }
    }
  }
};
</script>

<style scoped>
button {
  background-color: #275fda;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 10px 16px;
}

button:hover {
  background-color: #1e4bb8;
}
</style>
