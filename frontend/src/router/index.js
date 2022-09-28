import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/VueLogin.vue";
import Profile from "@/views/VueProfile.vue";

const routes = [
  {
    name: "Login",
    path: "/",
    component: Login,
  },
  {
    name: "profile",
    path: "/profile",
    component: Profile,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
