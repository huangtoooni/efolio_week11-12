<!-- src/views/HomeView.vue -->
<script setup>
import { ref } from 'vue'

const defaults = {
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  gender: '',
  reason: '',
  suburb: ''
}

const formData = ref({ ...defaults })
const submittedCards = ref([
  { username: 'Jinx',  password: '123', isAustralian: true,  gender: 'male',   reason: '' },
  { username: 'Yiwei', password: '123', isAustralian: true,  gender: 'male',   reason: '' },
  { username: 'Delvin',password: '486', isAustralian: true,  gender: 'male',   reason: 'I like reading.' },
  { username: 'Beg',   password: '999', isAustralian: true,  gender: 'male',   reason: 'I like history.' }
])

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null,
})

const friendMessage = ref(null)

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = "Name must be at least 3 characters";
  } else {
    errors.value.username = null;
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number.";
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character.";
  } else {
    errors.value.password = null;
  }
};

const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.resident = "You must be an Australian resident to proceed.";
  } else {
    errors.value.resident = null;
  }
};

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = "Please select a gender.";
  } else {
    errors.value.gender = null;
  }
};

const validateConfirmPassword = (blur) => {
  if (formData.value.confirmPassword !== formData.value.password) {
    if (blur) errors.value.confirmPassword = "Passwords do not match.";
  } else {
    errors.value.confirmPassword = null;
  }
};

const validateReason = (blur) => {
  const reason = formData.value.reason.trim();
  

  if (reason.toLowerCase().includes('friend')) {
    friendMessage.value = "Great to have a friend";
  } else {
    friendMessage.value = null;
  }
  
  // Existing validation
  if (reason.length < 10) {
    if (blur) errors.value.reason = "Reason must be at least 10 characters long.";
  } else {
    errors.value.reason = null;
  }
};

const submitForm = () => {
  validateName(true);
  validatePassword(true);
  validateConfirmPassword(true);
  validateResident(true);
  validateGender(true);
  validateReason(true);
  
  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword && !errors.value.resident && !errors.value.gender && !errors.value.reason) {
    submittedCards.value.push({ ...formData.value });
    clearForm();
  }
};

function clearForm () {
  Object.assign(formData.value, defaults)
}
</script>

<template>
  <!-- Form kept centred -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="text-center mb-4">
          <h1 class="mb-2">🗃️ W5. Library Registration Form</h1>
          <p class="text-muted">Let's build some more advanced features into our form.</p>
        </div>

        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input id="username" name="username" type="text" class="form-control"
                     v-model="formData.username" autocomplete="username"
                     @blur="() => validateName(true)"
                     @input="() => validateName(false)" />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select id="gender" name="gender" class="form-select" v-model="formData.gender"
                      @blur="() => validateGender(true)"
                      @change="() => validateGender(true)">
                <option disabled value="">Please select…</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">
                {{ errors.gender }}
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password" 
              />
              <div v-if="errors.password" class="text-danger">
                {{ errors.password }}
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-6">
              <div class="form-check mt-2">
                <input id="isAustralian" name="isAustralian" type="checkbox" class="form-check-input"
                       v-model="formData.isAustralian"
                       @change="() => validateResident(true)" />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
              <div v-if="errors.resident" class="text-danger">
                {{ errors.resident }}
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea id="reason" name="reason" rows="3" class="form-control"
                      v-model="formData.reason"
                      @blur="() => validateReason(true)"
                      @input="() => validateReason(false)"></textarea>
            <div v-if="errors.reason" class="text-danger">
              {{ errors.reason }}
            </div>
            <div v-if="friendMessage" class="text-success">
              {{ friendMessage }}
            </div>
          </div>

          <div class="mb-3">
            <label for="suburb" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-model="formData.suburb" />
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- PrimeVue DataTable Test -->
  <div class="container mt-4" v-if="submittedCards.length">
    <h3>Submitted Users (PrimeVue DataTable)</h3>
    <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
      <Column field="username" header="Username"></Column>
      <Column field="password" header="Password"></Column>
      <Column field="isAustralian" header="Australian Resident">
        <template #body="slotProps">
          {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
        </template>
      </Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="reason" header="Reason"></Column>
    </DataTable>
  </div>

  <!-- Cards in full-width container: four on one line -->
  <div class="container mt-4" v-if="submittedCards.length">
    <h3 class="mt-4">Cards View</h3>
    <div class="row g-3 row-cols-4">
      <div class="col" v-for="(card, i) in submittedCards" :key="i">
        <div class="card h-100">
          <div class="card-header">User Information</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: {{ card.username }}</li>
            <li class="list-group-item">Password: {{ card.password }}</li>
            <li class="list-group-item">
              Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
            </li>
            <li class="list-group-item">Gender: {{ card.gender || '—' }}</li>
            <li class="list-group-item">Reason: {{ card.reason || 'None' }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

