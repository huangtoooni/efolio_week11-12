<script>
import axios from 'axios'

export default {
  name: 'CountBookAPI',
  data() {
    return {
      jsondata: null,
      error: null,
      loading: false
    }
  },
  mounted() {
    this.getBookCountAPI()
  },
  methods: {
    async getBookCountAPI() {
      this.loading = true
      try {
        const response = await axios.get(
          'https://us-central1-week7-shenghong.cloudfunctions.net/countBooks'
        )
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = error
        this.jsondata = null
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <section class="count-book">
    <h1>Count Book API</h1>

    <div class="actions">
      <button :disabled="loading" @click="getBookCountAPI">
        <span v-if="loading">Loading...</span>
        <span v-else>Refresh Count</span>
      </button>
    </div>

    <p v-if="error" class="error">Error loading data. Check the console for details.</p>

    <pre>{{ jsondata }}</pre>
  </section>
</template>

<style scoped>
.count-book {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

h1 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

button {
  background-color: #275fda;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: #1f4dac;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #a30000;
  text-align: center;
  margin-bottom: 1rem;
}

pre {
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  min-height: 100px;
}
</style>
