<script setup>
import { ref, onMounted } from 'vue';
import { getUserConnected } from "../userConnected.js";
import Logout from "./Logout.vue";

const user = ref(null);

onMounted(async () => {
  user.value = await getUserConnected();
  // console.log(user.value);
});

</script>
<script>
export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    }
  }
};
</script>



<template>





  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <router-link to="/" class="flex ms-2 md:me-24">
          <svg fill="#FFD700" width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.489 2 2 6.489 2 12s4.489 10 10 10 10-4.489 10-10S17.511 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.707-10.707a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l2-2a1 1 0 1 0-1.414-1.414L13 10.586V7a1 1 0 1 0-2 0v3.586z"/>
          </svg>
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Q&A Overflow</span>
        </router-link>

        </div>
        <div class="flex items-center" v-if="user">
  <!-- Nom de l'utilisateur cliquable -->
  <button @click="toggleDropdown" type="button" class="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false">
    <span class="sr-only">Open user menu</span>
    <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <!-- Initial de l'utilisateur -->
      <span class="absolute inset-0 text-md font-semibold text-gray-800 flex items-center justify-center dark:text-white-300">{{ user.name.charAt(0) }} {{ user.name.split(' ')[1] ? user.name.split(' ')[1].charAt(0) : '' }}</span>
    </div>
    <span class="ml-2 text-white truncate">{{ user.name }}</span>
  </button>

  <!-- Sous-menu -->
  <div v-if="showDropdown" @mouseleave="closeDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
    <div class="px-4 py-3">
      <p class="text-sm text-gray-900 dark:text-white">{{ user.name }}</p>
      <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300">{{ user.email }}</p>
    </div>
    <ul class="py-1">
      <li><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a></li>
      <li><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a></li>
      <li><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a></li>
      <li>
          <!-- Composant Logout -->
          <Logout />
        </li>
      </ul>
  </div>
</div>
      </div>
    </div>
  </nav>

  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-dark-blue-900 border-r border-gray-200 sm:translate-x-0 dark:bg-dark-blue-900 dark:border-gray-700" aria-label="Sidebar">
  <div class="h-full px-3 pb-4 overflow-y-auto bg-dark-blue-900 dark:bg-dark-blue-900">
    <ul class="space-y-2 font-medium pl-12">
    <li>
        <router-link to="/" class="flex items-center p-2 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-700 group">
            <svg class="flex-shrink-0 w-6 h-6 text-yellow-500 transition duration-75 dark:text-yellow-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span class="ms-3">Accueil</span>
        </router-link>
    </li>
    <li v-if="user">
        <router-link to="/" class="flex items-center p-2 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-gray-700 group">
              <svg fill="currentColor" class="flex-shrink-0 w-5 h-5 text-yellow-500 transition duration-75 dark:text-yellow-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
            <span class="flex-1 ms-3 whitespace-nowrap"> Questions</span>
        </router-link>
    </li>
    <li>
        <router-link to="/tags" class="flex items-center p-2 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-gray-700 group">
            <svg fill="currentColor" class="flex-shrink-0 w-5 h-5 text-yellow-500 transition duration-75 dark:text-yellow-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.63 5.84C16.68 4.9 15.4 4.4 14 4.4s-2.68.5-3.63 1.44l-6.19 6.19c-.78.78-.78 2.05 0 2.83l3.54 3.54c.78.78 2.05.78 2.83 0l6.19-6.19c.95-.95 1.44-2.23 1.44-3.63s-.5-2.68-1.44-3.63zm-1.41 7.21l-6.19 6.19c-.2.2-.51.2-.71 0l-3.54-3.54c-.2-.2-.2-.51 0-.71l6.19-6.19c.73-.73 1.71-1.13 2.73-1.13s2 .4 2.73 1.13c.73.73 1.13 1.71 1.13 2.73s-.4 2-1.13 2.73z"/>
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Tags</span>
        </router-link>
    </li>
    <li>
    <router-link to="/user" class="flex items-center p-2 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-gray-700 group">
      <svg fill="currentColor" class="flex-shrink-0 w-5 h-5 text-yellow-500 transition duration-75 dark:text-yellow-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
      <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
    </router-link>
  </li>
  <li v-if="!user">
    <router-link to="/login" class="flex items-center p-2 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-gray-700 group">
      <svg fill="currentColor" class="flex-shrink-0 w-5 h-5 text-yellow-500 transition duration-75 dark:text-yellow-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 17v-6h4v6h5v-8h3L12 3 2 9h3v8z"/>
      </svg>
      <span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
    </router-link>
  </li>
  <li v-if="!user">
    <router-link to="/register" class="flex items-center p-2 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-gray-700 group">
      <svg fill="currentColor" class="flex-shrink-0 w-5 h-5 text-yellow-500 transition duration-75 dark:text-yellow-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 12h7v2h-7v-2zm-2 6h9v2h-9v-2zm2-8h7v2h-7v-2zm-5 8h2v-2H8v2zm-3 0h2v-2H5v2zm-3 0h2v-2H2v2zm6-4h2v-2H8v2zm-3 0h2v-2H5v2zm-3 0h2v-2H2v2z"/>
      </svg>
      <span class="flex-1 ms-3 whitespace-nowrap">Register</span>
    </router-link>
  </li>
</ul>



  </div>
</aside>


  <div class="p-4 sm:ml-64">
    <div class="p-4 border-gray-200  rounded-lg dark:border-gray-700 mt-14">

          <!--    Mettre les components ici apres chaque redirection du router    -->
          <router-view></router-view>


      </div>

  </div>



</template>

<style scoped>

</style>