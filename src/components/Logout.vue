<script setup>
import axios from "axios";
import router from "../router.js";

const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` }
};
const logout = () => {
  axios.post('http://127.0.0.1:8000/api/logout', {}, config)
    .then(response => {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      router.go();
    })
    .catch(error => {
      alert('Erreur lors de la deconnexion')
    });
}
</script>

<template>
<!--  Creer un bouton deconnecter que je mettrais dans mon navbar-->
<button @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
      Deconnexion
    </button>
 </template>

<style scoped>

</style>