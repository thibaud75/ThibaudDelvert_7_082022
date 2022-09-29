import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/VueLogin.vue";
import Profile from "@/views/VueProfile.vue";
import Social from "@/views/VueSocial.vue";
import Post from "@/views/VuePost.vue";

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
  {
    name: "Social",
    path: "/social",
    component: Social,
    props: true,
  },
  {
    name: "Post",
    path: "/post",
    component: Post,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
