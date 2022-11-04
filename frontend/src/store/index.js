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

let axiosAuth = {
  headers: {
    Authorization: "Bearer " + user.token,
  },
};

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
      title: "",
      userId: "",
      _id: "",
      userLiked: [],
      likes: "",
      image: "",
    },
    getOnePost: null,
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common["Authorization"] = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
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
    getOnePost: function (state, getOnePost) {
      state.getOnePost = getOnePost;
    },
  },
  actions: {
    // ROUTE USER
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
      // console.log("getUserInfos " + user.userId);
      // console.log(
      //   "id en storage " + JSON.parse(localStorage.getItem("user")).userId
      // );
      instance
        .get("auth/infos/" + JSON.parse(localStorage.getItem("user")).userId)
        .then(function (response) {
          commit("userInfos", response.data);
          // console.log(response.data);
          return response;
        })
        .then((response) => {
          // console.log(response.data);
        })
        .catch(function () {});
    },

    // ROUTE POST
    createPost: ({ commit }, postInfos) => {
      instance
        .post("post", postInfos, axiosAuth)
        .then(function (response) {
          commit(response.data);
          // console.log(response.data);
          commit("logUser", response.data.user);
          return response;
        })
        .catch(function (error) {
          commit("setStatus", "error_post");
          return error;
        });
    },

    getAllPosts: ({ commit }) => {
      instance
        .get("post", axiosAuth)
        .then(function (response) {
          commit("postInfos", response.data);
          // console.log(response.data);
          return response;
        })
        .then((response) => {
          // console.log(response.data);
        })
        .catch(function () {});
    },
    getPostInfos: ({ commit }, postId) => {
      instance
        .get("post/" + postId, axiosAuth)
        .then(function (response) {
          commit("getOnePost", response.data);
          // console.log(response.data);
          return response;
        })
        .then((response) => {
          // console.log(response.data);
        })
        .catch(function () {});
    },
    modifyPost: ({ commit }, [id, getOnePost]) => {
      instance
        .put(`/post/${id}`, getOnePost, axiosAuth)
        .then(function (response) {
          commit(response.data);
          // console.log(response.data);
          return response;
        })
        .catch(function () {});
    },
    likePost: ({ commit }, [id, postInfos]) => {
      instance
        .post(`/post/${id}/like`, postInfos, axiosAuth)
        .then(function (response) {
          commit(response.data);
          // console.log(response.data);
          return response;
        })
        .catch(function () {});
    },
  },
});

export default store;
