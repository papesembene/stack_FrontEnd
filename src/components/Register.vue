<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const router = useRouter();


const register = () => {
  axios.post('http://127.0.0.1:8000/api/register', {
    email: email.value,
    password: password.value,
    name: name.value
  })
  .then(response => {
    localStorage.setItem('token', response.data.token);
    // token expire après 1 heure
    localStorage.setItem('tokenExpiration', Date.now() + 3600 * 1000);
    router.push('/');
  })
  .catch(error => {
    error.value = 'Informations Invalides';
  });
}

</script>

<template>
  <br>
  <br>
  <br>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <div class="flex items-center justify-center mb-6">
      <router-link to="/" class="flex items-center">
        <svg fill="#FFD700" width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.489 2 2 6.489 2 12s4.489 10 10 10 10-4.489 10-10S17.511 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.707-10.707a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l2-2a1 1 0 1 0-1.414-1.414L13 10.586V7a1 1 0 1 0-2 0v3.586z"/>
        </svg>
        <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-dark-blue-700">Q&A Overflow</span>
      </router-link>
    </div>
    <h2 class="text-2xl font-bold mb-4">S'Inscrire</h2>
    <form @submit.prevent="register" class="space-y-4">
      <div class="flex items-center space-x-2">
        <svg fill="#1C274C" class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.486 2 2 6.486 2 12c0 3.008 1.349 5.703 3.446 7.454C5.136 19.966 5 20.471 5 21v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1c0-0.529-0.135-1.034-0.446-1.546C20.651 17.703 22 15.008 22 12c0-5.514-4.486-10-10-10zm5.5 20h-11c-0.172-0.229-0.5-0.746-0.5-1v-1c0-2.481 2.019-4.5 4.5-4.5h3c2.481 0 4.5 2.019 4.5 4.5v1C18 21.254 17.672 21.771 17.5 22zM16 12h-2v-1a1 1 0 1 0-2 0v1H8v-1a3 3 0 0 1 6 0v1z"/>
        </svg>
        <input 
          type="text" 
          v-model="name" 
          required 
          placeholder="Nom"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-dark-blue-700 focus:ring focus:ring-dark-blue-700 focus:ring-opacity-50"
        />
      </div>
      <div class="flex items-center space-x-2">
        <svg fill="#1C274C" class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103 0.897 2 2 2h16c1.103 0 2-0.897 2-2V6C22 4.897 21.103 4 20 4zM20 18H4V8h16V18zM4 6h16V6H4z"/>
        </svg>
        <input 
          type="email" 
          v-model="email" 
          required 
          placeholder="Email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-dark-blue-700 focus:ring focus:ring-dark-blue-700 focus:ring-opacity-50"
        />
      </div>
      <div class="flex items-center space-x-2">
        <svg fill="#1C274C" class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2H7C5.897 2 5 2.897 5 4v16c0 1.103 0.897 2 2 2h10c1.103 0 2-0.897 2-2V4C19 2.897 18.103 2 17 2zM17 20H7V4h10V20zM9 8h6v2H9zM9 12h6v2H9zM9 16h6v2H9z"/>
        </svg>
        <input 
          type="password" 
          v-model="password" 
          required 
          placeholder="Mot de passe"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-dark-blue-700 focus:ring focus:ring-dark-blue-700 focus:ring-opacity-50"
        />
      </div>
      <button 
        type="submit" 
        class="w-full bg-dark-blue-700 hover:bg-dark-blue-900 text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2"
      >
        <svg fill="currentColor" class="w-5 h-5 text-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5 9a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
        <span>Register</span>
      </button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      <p class="mt-4">
        Déjà un compte? 
        <router-link to="/login" class="text-dark-blue-700 hover:underline">Connectez-vous</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>

</style>