<script setup>
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import { getUserConnected } from "../userConnected.js";

const user = ref(null);
const tagsList = ref([]);

onMounted(async () => {
  user.value = await getUserConnected();
  console.log(user.value);

  // Récupération des tags
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/tags');
    tagsList.value = response.data.tags;
  } catch (error) {
    console.error('Erreur lors de la récupération des tags:', error);
  }
});

const title = ref('');
const body = ref('');
const selectedTags = ref([]);
const user_id = ref(null);

watch(user, () => {
  if (user.value !== null) {
    user_id.value = user.value.id;
  }
});

const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const createQuestion = () => {
  axios.post('http://127.0.0.1:8000/api/questions', {
    title: title.value,
    body: body.value,
    tags: selectedTags.value,
    user_id: user_id.value
  }, config)
      .then(response => {
        // console.log(response.data);
        alert('Question créée avec succès');
        title.value = '';
        body.value = '';
        selectedTags.value = [];

      })
      .catch(error => {
        console.log(error);
      });
}
</script>

<template>
 <div class="max-w-8xl mx-auto mt-10 px-6">
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold mb-4">Votre question</h2>
    <form @submit.prevent="createQuestion" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Titre:</label>
        <input
          type="text"
          v-model="title"
          required
          class="mt-1 block w-full rounded-md border-2 border-blue-900 shadow-sm focus:border-blue-700 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Description:</label>
        <textarea
          v-model="body"
          required
          class="mt-1 block h-28 w-full rounded-md border-2 border-blue-900 shadow-sm focus:border-blue-700 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Tags:</label>
        <select
          v-model="selectedTags"
          multiple
          required
          class="mt-1 block w-full rounded-md border-2 border-blue-900 shadow-sm focus:border-blue-700 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option v-for="tag in tagsList" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
        </select>
      </div>
      <button type="submit" class="bg-blue-900 text-white py-2 px-4 rounded-lg">Ajouter</button>
    </form>
  </div>
</div>

</template>

<style scoped>
</style>
