import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from "./components/Register.vue";
import Home from "./components/Home.vue";
import QuestionDetail from "./components/QuestionDetail.vue";
import CreateQuestion from "./components/CreateQuestion.vue";
import Tags from "./components/Tags.vue";
import Users from "./components/Users.vue";


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/user', component: Users },
  {
    path: '/register', component: Register
  },
  {
    path: '/question/show/:id',
    component: QuestionDetail,
    props: true // Active la récupération automatique des paramètres d'URL
  },
  {
    path: '/question/create',
    component: CreateQuestion,
    meta: { requiresAuth: true }  // Ajoute la métadonnée pour la protection de la route
  },
  {
    path: '/tags',
    component: Tags
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Garde de navigation globale
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
