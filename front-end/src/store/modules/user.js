import Axios from "../../axios";

const state = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  loadingUser: false,
  errorUser: false,
};
const getters = {
  userInfo: (state) => state.userInfo,
  loadingUser: (state) => state.loadingUser,
  errorUser: (state) => state.errorUser,
};
const actions = {
  async register({ commit }, { username, password, adminCode }) {
    commit("USER_REGISTER_REQUEST", { username, password, adminCode });
    try {
      const { data } = await Axios.post("/api/users/register", {
        username: username,
        password: password,
        adminCode: adminCode,
      });
      commit("USER_REGISTER_SUCCESS", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      commit(
        "USER_REGISTER_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async signIn({ commit }, { username, password }) {
    commit("USER_SIGNIN_REQUEST", { username: username, password: password });
    try {
      const { data } = await Axios.post("/api/users/signin", {
        username: username,
        password: password,
      });
      commit("USER_SIGNIN_SUCCESS", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      commit(
        "USER_SIGNIN_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  signOut({ commit }) {
    commit("USER_SIGNOUT");
    localStorage.removeItem("userInfo");
    
  },
  clear({ commit }) {
    commit("CLEAR");
  },
};
const mutations = {
  USER_REGISTER_REQUEST: (state) => {
    state.loadingUser = false;
  },
  USER_REGISTER_SUCCESS: (state, payload) => {
    state.loadingUser = false;
    state.userInfo = payload;
  },
  USER_REGISTER_FAIL: (state, payload) => {
    state.loadingUser = false;
    state.errorUser = payload;
  },
  USER_SIGNIN_REQUEST: (state) => {
    state.loadingUser = true;
  },
  USER_SIGNIN_SUCCESS: (state, payload) => {
    state.loadingUser = false;
    state.userInfo = payload;
  },
  USER_SIGNIN_FAIL: (state, payload) => {
    (state.loadingUser = false), (state.error = payload);
  },
  USER_SIGNOUT: (state) => {
    state.userInfo = null;
  },
  CLEAR: (state) => {
    state.loadingUser = false;
    state.errorUser = false;
    state.userInfo = null;
  },
};
export default { state, getters, actions, mutations };
