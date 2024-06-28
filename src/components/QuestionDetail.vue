<template>
  <div class="container mx-auto px-4 md:px-16 lg:px-32">
    <!-- Section Question -->
    <div class="border p-6 rounded-md my-8 bg-white shadow-lg">
      <h2 class="text-4xl font-semibold mb-4">{{ question.title }}</h2>
      <hr class="my-4">
      <p class="text-gray-700 text-lg">{{ question.body }}</p>
      <div class="mt-4">
        <span v-for="tag in tags" :key="tag.id" class="mr-2 inline-block bg-yellow-300 text-dark-blue-800 p-2 rounded-full text-sm font-semibold tracking-wide">
          {{ tag.name }}
        </span>
      </div>
      <div class="mt-6 flex justify-between items-center text-gray-500">
        <button v-if="question.user.id === user.id" @click="editQuestion" class="text-dark-blue-700 hover:underline">
          Modifier
        </button>
        <p>Posté par {{ question.user.name }} {{ timeAgo(question.created_at) }}</p>
      </div>
      <div v-if="isEditingQuestion" class="mt-6">
        <input v-model="editedQuestionTitle" class="block w-full p-2 border rounded mb-4" />
        <textarea v-model="editedQuestionBody" class="block w-full p-2 border rounded mb-4"></textarea>
        <button @click="saveEditedQuestion" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Sauvegarder
        </button>
      </div>
    </div>

    <!-- Section Réponses -->
    <div class="border p-6 rounded-md my-8 bg-white shadow-lg">
      <h3 class="text-3xl font-semibold mb-4">Réponses</h3>
      <hr class="my-4">
      <div v-for="answer in answers" :key="answer.id" class="border p-4 rounded-md my-4" :class="{ 'bg-green-100': answer.isValidated, 'bg-gray-50': !answer.isValidated }">
        <div class="flex">
          <div class="flex-1 flex flex-col justify-between">
            <p :class="{ 'text-green-500': answer.isValidated, 'text-gray-700': !answer.isValidated }" class="text-lg">
              {{ answer.body }}
              <svg v-if="answer.isValidated" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L10 17L20 7" stroke="#047a3f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </p>
            <div class="mt-4 flex justify-between items-center text-gray-500">
              <button v-if="answer.user.id === user.id && !isEditingAnswer[answer.id]" @click="editAnswer(answer.id)" class="text-blue-500 hover:underline">
                Modifier
              </button>
              <div class="flex items-center">
                <button v-if="canValidate(answer)" @click="validateAnswer(answer.id)" class="text-green-500 hover:underline">
                  Valider
                </button>
              </div>
              <p>Répondu par {{ answer.user.name }} {{ timeAgo(answer.created_at) }}</p>
            </div>
            <div v-if="isEditingAnswer[answer.id]" class="mt-6">
              <textarea v-model="editedAnswerBody" class="block w-full p-2 border rounded mb-4"></textarea>
              <button @click="saveEditedAnswer(answer.id)" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulaire de réponse -->
      <form @submit.prevent="submitAnswer" class="mt-6">
        <label for="answer" class="block text-sm font-medium text-gray-700 mb-2">Votre réponse:</label>
        <textarea
          id="answer"
          v-model="newAnswer"
          required
          rows="4"
          class="mt-1 block w-full rounded-md border-2 border-dark-blue-800 shadow-sm focus:border-dark-blue-800 focus:ring focus:ring-dark-blue-800 focus:ring-opacity-50"
        ></textarea>
        <button type="submit" class="mt-4 bg-dark-blue-900 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
          Répondre à la question
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const route = useRoute();
const questionId = ref(route.params.id);

const question = ref({});
const tags = ref([]);
const answers = ref([]);
const newAnswer = ref('');
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));

const isEditingQuestion = ref(false);
const editedQuestionTitle = ref('');
const editedQuestionBody = ref('');

const isEditingAnswer = ref({});
const editedAnswerBody = ref('');

// Assurez-vous que isValidated est défini correctement
const fetchQuestionData = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/questions/${questionId.value}`);
    question.value = response.data.question;
    tags.value = response.data.question.tags;
    answers.value = response.data.question.answers.map(answer => ({
      ...answer,
      isValidated: getValidatedState(answer.id) // Récupérer l'état de validation à partir de localStorage
    }));
  } catch (error) {
    console.log(error);
  }
};

// Appel de la fonction pour récupérer les données
fetchQuestionData();

const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
};

const submitAnswer = async () => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/questions/${questionId.value}/answers`, {
      body: newAnswer.value
    });
    answers.value.push({
      ...response.data.answer,
      isValidated: false // Assurez-vous que isValidated est défini à false pour les nouvelles réponses
    });
    newAnswer.value = '';
  } catch (error) {
    console.log(error);
    alert("Vous n'etes pas autorise a acceder a cette ressource sans un token valide");
    newAnswer.value = '';
  }
};

const editQuestion = () => {
  isEditingQuestion.value = true;
  editedQuestionTitle.value = question.value.title;
  editedQuestionBody.value = question.value.body;
};

const saveEditedQuestion = async () => {
  if (question.value.user.id === user.value.id) {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/questions/${questionId.value}`, {
        title: editedQuestionTitle.value,
        body: editedQuestionBody.value,
      });
      question.value = response.data.question;
      isEditingQuestion.value = false;
      alert('Question modifiée avec succès !');
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Vous n\'êtes pas autorisé à modifier cette question.');
  }
};

const editAnswer = (answerId) => {
  const answer = answers.value.find(a => a.id === answerId);
  if (answer) {
    isEditingAnswer.value[answerId] = true;
    editedAnswerBody.value = answer.body;
  }
};

const saveEditedAnswer = async (answerId) => {
  const answer = answers.value.find(a => a.id === answerId);
  if (answer.user?.id === user.value.id) {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/answers/${answerId}`, {
        body: editedAnswerBody.value,
      });
      const index = answers.value.findIndex(a => a.id === answerId);
      answers.value[index] = {
        ...response.data.answer,
        isValidated: answers.value[index].isValidated || false // Maintient isValidated si déjà défini
      };
      isEditingAnswer.value[answerId] = false;
      alert('Réponse modifiée avec succès !');
    } catch (error) {
      console.log(error);
      alert("Vous n'etes pas autorise a acceder a cette ressource sans un token valide");

    }
  } else {
    console.log('Vous n\'êtes pas autorisé à modifier cette réponse.');
  }
};

const validateAnswer = async (answerId) => {
  const answer = answers.value.find(a => a.id === answerId);
  if (answer && !answer.isValidated) {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/answers/${answerId}/validate`);
      const validatedAnswer = response.data.answer;
      const index = answers.value.findIndex(a => a.id === answerId);
      answers.value[index] = {
        ...validatedAnswer,
        isValidated: true // Définir isValidated à true après validation
      };
      setValidatedState(answerId, true); // Stocker l'état de validation dans localStorage
      alert('Réponse validée !');
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('Réponse déjà validée');
  }
};

// Utiliser localStorage pour stocker l'état de validation des réponses
const setValidatedState = (answerId, isValidated) => {
  const validatedAnswers = JSON.parse(localStorage.getItem('validatedAnswers') || '{}');
  validatedAnswers[answerId] = isValidated;
  localStorage.setItem('validatedAnswers', JSON.stringify(validatedAnswers));
};

const getValidatedState = (answerId) => {
  const validatedAnswers = JSON.parse(localStorage.getItem('validatedAnswers') || '{}');
  return validatedAnswers[answerId] || false;
};

// Nouvelle méthode pour vérifier si une réponse peut être validée
const canValidate = (answer) => {
  return (user.value.role === 'supervisor' || user