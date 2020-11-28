import Axios from "../../axios";

const state = {
  loadingRate: false,
  errorRate: false,
  rate: [],
  updatedIndividual: {},
  messageRate: "",
};
const getters = {
  loadingRate: (state) => state.loadingRate,
  errorRate: (state) => state.errorRate,
  rate: (state) => state.rate,
  updatedIndividual: (state) => state.updatedIndividual,
  messageRate: (state) => state.messageRate,
};
const actions = {
  async ratePost({ commit }, { individualId, rating, text, userInfo }) {
    commit("RATE_POST_REQUEST", {
      individualId,
      rating,
      text,
      userInfo,
    });
    try {
      const { data } = await Axios.post(
        "/api/rate",
        { individualId, rating, text },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit("RATE_POST_SUCCESS", {
        rate: data.rate,
        updatedIndividual: data.updatedIndividual,
      });
    } catch (error) {
      commit(
        "RATE_POST_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async rateEdit({ commit }, { rateId, rating, text, individualId, userInfo }) {
    commit("RATE_EDIT_REQUEST", {
      rateId,
      rating,
      text,
      individualId,
      userInfo,
    });
    try {
      const { data } = await Axios.put(
        `/api/rate/${rateId}`,
        {
          rateId: rateId,
          rating: rating,
          text: text,
          individualId: individualId,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit("RATE_EDIT_SUCCESS", {
        rate: data.rate,
        updatedIndividual: data.updatedIndividual,
        message: data.message,
      });
    } catch (error) {
      commit(
        "RATE_EDIT_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async rateDelete({ commit }, { rateId, individualId, userInfo }) {
    commit("RATE_DELETE_REQUEST", { rateId, individualId, userInfo });
    try {
      const { data } = await Axios.delete(`/api/rate/${rateId}`, {
        data: {
          isAdmin: userInfo.isAdmin,
          rateId: rateId,
          individualId: individualId,
        },
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      commit("RATE_DELETE_SUCCESS", {
        message: data.message,
        updatedIndividual: data.updatedIndividual,
      });
    } catch (error) {
      commit(
        "RATE_DELETE_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
};
const mutations = {
  RATE_POST_REQUEST: (state) => {
    state.loadingRate = true;
  },
  RATE_POST_SUCCESS: (state, payload) => {
    state.loadingRate = false;
    state.rateRate = payload.rate;
    state.updatedIndividual = payload.updatedIndividual;
  },
  RATE_POST_FAIL: (state, payload) => {
    state.errorRate = payload;
    state.loadingRate = false;
  },
  RATE_EDIT_REQUEST: (state) => {
    state.loading = true;
  },
  RATE_EDIT_SUCCESS: (state, payload) => {
    state.loadingRate = false;
    state.rate = payload.rate;
    state.updatedIndividual = payload.updatedIndividual;
    state.messageRate = payload.message;
  },
  RATE_EDIT_FAIL: (state, payload) => {
    state.errorRate = payload;
    state.loadingRate = false;
  },
  RATE_DELETE_REQUEST: (state) => {
    state.loadingRate = true;
  },
  RATE_DELETE_SUCCESS: (state, payload) => {
    state.loadingRate = false;
    state.messageRate = payload.message;
    state.updatedIndividual = payload.updatedIndividual;
  },
  RATE_DELETE_FAIL: (state, payload) => {
    state.errorRate = payload;
    state.loadingRate = false;
  },
};
export default { state, getters, actions, mutations };
