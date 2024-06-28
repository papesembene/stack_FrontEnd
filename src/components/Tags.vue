<template>
  <div>
    <h1 class="text-4xl">Tags</h1>
    <br><br>

    <!-- Champ de recherche -->
    <input type="text" v-model="searchTerm" placeholder="Rechercher un tag..." class="p-2 border rounded-md mb-4">

    <!-- Liste des tags filtrée -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="tag in filteredTags" :key="tag.id" class="bg-white p-4 shadow rounded-lg">
        <h2 class="text-xl font-bold">{{ tag.name }}</h2>
        <p>{{ tag.description }}</p>
        <p>{{ tag.questions_count }} questions</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';

const tags = ref([]);
const searchTerm = ref('');

axios.get('http://127.0.0.1:8000/api/tags')
  .then(response => {
    tags.value = response.data.tags;
  })
  .catch(error => {
    console.log(error);
  });

// Filtrer les tags en fonction du terme de recherche
const filteredTags = computed(() => {
  return tags.value.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

<style scoped>
/* Styles spécifiques au composant peuvent être ajoutés ici */
</style>
