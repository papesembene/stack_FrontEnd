<template>
  <div>
    <h1 class="text-4xl">Users</h1>
    <br><br>

    <!-- Champ de recherche -->
    <input type="text" v-model="searchTerm" placeholder="Rechercher un utilisateur..." class="p-2 border rounded-md mb-4">

    <!-- Liste des utilisateurs filtrée -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="user in filteredUsers" :key="user.id" class="bg-white p-4 shadow rounded-lg">
        <!-- Remplacez par l'icône appropriée pour l'utilisateur -->
        <svg fill="currentColor" class="flex-shrink-0 w-6 h-6 text-yellow-500 transition duration-75 dark:text-yellow-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <h2 class="text-xl font-bold">{{ user.name }}</h2>
        <p>{{ user.email }}</p>
        <p>{{ user.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';

const users = ref([]);
const searchTerm = ref('');

axios.get('http://127.0.0.1:8000/api/users')
  .then(response => {
    users.value = response.data.users;
  })
  .catch(error => {
    console.log(error);
  });

// Filtrer les utilisateurs en fonction du terme de recherche
const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

<style scoped>
/* Styles spécifiques au composant peuvent être ajoutés ici */
</style>
