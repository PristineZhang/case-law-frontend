// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SearchPage from '../views/SearchPage.vue';
import ChatbotPage from '../views/ChatbotPage.vue';
import AnswerPage from '../views/AnswerPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/search', name: 'Search', component: SearchPage },
  { path: '/chatbot', name: 'Chatbot', component: ChatbotPage },
  { path: '/answer', name: 'Answer', component: AnswerPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
