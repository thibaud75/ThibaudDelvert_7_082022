import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

// Create a new store instance.
const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      nom: "",
      prenom: "",
      email: "",
      photo: "",
    },
    postInfos: {
      description: "",
      image: "",
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common["Authorization"] = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
      console.log(user);
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
    postInfos: function (state, postInfos) {
      state.postInfos = postInfos;
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("auth/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("auth/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit }) => {
      console.log("getUserInfos " + user.userId);
      console.log(
        "id en storage " + JSON.parse(localStorage.getItem("user")).userId
      );
      instance
        .get("auth/infos/" + JSON.parse(localStorage.getItem("user")).userId)
        .then(function (response) {
          commit("userInfos", response.data);
          console.log(response.data);
          return response;
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch(function () {});
    },
    createPost: ({ commit }, postInfos) => {
      console.log("yo");
      instance
        .post("post", postInfos)
        .then(function (response) {
          commit(response.data);
          console.log(response.data);
          return response;
        })
        .catch(function () {});
    },
  },
});

export default store;
