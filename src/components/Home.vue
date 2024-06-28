<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { getUserConnected } from "../userConnected.js";
import router from "../router.js";

const questions = ref([]);
const user = ref(null);
const searchTerm = ref('');

// Fonction pour charger les questions depuis l'API
axios.get('http://127.0.0.1:8000/api/questions')
  .then(response => {
    questions.value = response.data.questions;
  })
  .catch(error => {
    console.log(error);
  });

// Récupérer l'utilisateur connecté
getUserConnected().then(userData => {
  user.value = userData;
});

// Redirection vers la page de création de question
const goCreateQuestion = () => {
  if (user.value === null) {
    alert('Vous devez vous connecter pour poser une question');
    return;
  }
  router.push('/question/create');
}

// Filtrer les questions en fonction du terme de recherche
const filteredQuestions = computed(() => {
  return questions.value.filter(question =>
    question.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    question.body.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    question.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );
});
</script>

<template>
  <div class="flex justify-between items-center">
    <h1 class="text-4xl">Top Questions</h1>
    <router-link @click="goCreateQuestion" to="" class="bg-[#1C274C] text-white py-2 px-4 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:bg-[#14213D] hover:-translate-y-1 active:bg-[#0F172A] active:translate-y-0">Poser Votre question</router-link>
  </div>
  <br><br>
  <!-- Barre de recherche -->
  <input type="text" v-model="searchTerm" placeholder="Rechercher une question..." class="p-2 border rounded-md mb-4 w-full md:w-1/2">

  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Affichage des questions filtrées -->
      <div v-for="question in filteredQuestions" :key="question.id" class="border p-4 rounded-md">
        <router-link :to="{ path: '/question/show/' + question.id }">
          <h2 class="text-xl font-bold mb-2">{{ question.title }}</h2>
          <p class="text-gray-700">{{ question.body }}</p>
          <div class="mt-2">
            <span v-for="tag in question.tags" :key="tag.id" class="mr-1 inline-block bg-yellow-300 text-dark-blue-800 p-2 rounded-full text-sm font-semibold tracking-wide">{{ tag.name }}</span>
          </div>
          <div class="mt-2 text-sm text-gray-600">
            {{ question.answers_count }} réponse(s)
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles spécifiques au composant peuvent être ajoutés ici */
</style>
