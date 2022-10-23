import { createRouter, createWebHistory } from "vue-router";

import Login from "@/views/VueLogin.vue";
import Profile from "@/views/VueProfile.vue";
import Social from "@/views/VueSocial.vue";
import Newpost from "@/views/VueNewPost.vue";
import Post from "@/views/VuePost.vue";
import Edit from "@/views/VueEdit.vue";

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
    name: "newPost",
    path: "/newpost",
    component: Newpost,
    props: true,
  },
  {
    name: "Post",
    path: "/post/:id",
    component: Post,
    props: true,
  },
  {
    name: "Edit",
    path: "/edit/:id",
    component: Edit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
