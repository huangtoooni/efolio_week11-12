<script>
import axios from 'axios'

// API key is now stored in environment variables for security
const apikey = import.meta.env.VITE_OPENWEATHER_KEY

export default {
  name: 'WeatherView',
  data() {
    return {
      city: '',
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
      loading: false,
      errorMessage: ''
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null
    },
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (!navigator.geolocation) {
        this.errorMessage = 'Geolocation is not supported in this browser.'
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          await this.fetchWeatherData(url)
        },
        () => {
          this.errorMessage =
            'Unable to retrieve your location.'
        }
      )
    },
    async fetchWeatherData(url) {
      this.loading = true
      this.errorMessage = ''
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        this.errorMessage = 'Error fetching weather data. Please try again later.'
        console.error('Error fetching weather data:', error)
      } finally {
        this.loading = false
      }
    },
    async searchByCity() {
      const trimmedCity = this.city.trim()
      if (!trimmedCity) {
        this.errorMessage = 'Please enter a city name before searching.'
        return
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        trimmedCity
      )}&appid=${apikey}`
      await this.fetchWeatherData(url)
    }
  }
}
</script>

<template>
  <div class="container">
    <header class="page-header">
      <h1>Weather App</h1>
      <p class="subtitle">
        Get the current weather via your browser location or search by city.
      </p>
    </header>

    <section class="search-bar">
      <input
        v-model="city"
        type="text"
        placeholder="Enter city name"
        class="search-input"
        @keyup.enter="searchByCity"
      />
      <button class="search-button" :disabled="loading" @click="searchByCity">
        <span v-if="loading">Searching...</span>
        <span v-else>Search</span>
      </button>
    </section>

    <p class="helper-text">Tip: Try cities such as Melbourne, Kuala Lumpur.</p>

    <p v-if="errorMessage" class="alert error">{{ errorMessage }}</p>

    <main>
      <div v-if="weatherData" class="weather-card">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div class="weather-conditions">
          <img v-if="iconUrl" :src="iconUrl" alt="Weather Icon" />
          <p v-if="temperature !== null">{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 560px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

.page-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.subtitle {
  color: #666;
  margin-top: 0.5rem;
}

.search-bar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  font-size: 1rem;
}

.search-button {
  background-color: #275fda;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.search-button:hover:not(:disabled) {
  background-color: #1f4dac;
}

.search-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.helper-text {
  margin-top: 0.75rem;
  color: #8a8a8a;
  font-size: 0.9rem;
}

.alert {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
}

.alert.error {
  background: #ffe6e6;
  color: #a30000;
}

main {
  margin-top: 1.5rem;
}

.weather-card {
  background: #f8f8ff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.weather-conditions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.weather-conditions img {
  width: 72px;
  height: 72px;
}
</style>
