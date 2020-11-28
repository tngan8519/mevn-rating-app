import Axios from "../../axios";

const state = {
  loading: false,
  error: false,
  individuals: [],
  success: false,
  individual: {},
  src: "",
  message: "",
  loadingEdit: false,
  errorEdit: false,
  successEdit: false,
  loadingDelete: false,
  errorDelete: false,
  suceessDelete: false,
};
const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  individuals: (state) => state.individuals,
  success: (state) => state.success,
  individual: (state) => state.individual,
  src: (state) => state.src,
  message: (state) => state.message,
  loadingEdit: (state) => state.loadingEdit,
  errorEdit: (state) => state.errorEdit,
  successEdit: (state) => state.successEdit,
  loadingDelete: (state) => state.loadingDelete,
  errorDelete: (state) => state.errorDelete,
  successDelete: (state) => state.successDelete,
};
const actions = {
  async individualBrowse({ commit }) {
    commit("INDIVIDUAL_BROWSE_REQUEST");
    try {
      const { data } = await Axios.get("/api/individual");
      commit("INDIVIDUAL_BROWSE_SUCCESS", data);
    } catch (error) {
      commit(
        "INDIVIDUAL_BROWSE_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async detailIndividual({ commit }, id) {
    commit("INDIVIDUAL_DETAIL_REQUEST", id);
    try {
      const { data } = await Axios.get(`/api/individual/${id}`);
      commit("INDIVIDUAL_DETAIL_SUCCESS", data);
    } catch (error) {
      commit(
        "INDIVIDUAL_DETAIL_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async individualPost(
    { commit },
    { name, fileUpload, description, userInfo }
  ) {
    commit("INDIVIDUAL_POST_REQUEST", {
      name,
      fileUpload,
      description,
      userInfo,
    });
    try {
      const { data } = await Axios.post(
        "/api/individual",
        { name, image: fileUpload, description, isAdmin: userInfo.isAdmin },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit("INDIVIDUAL_POST_SUCCESS", data.individual);
    } catch (error) {
      commit(
        "INDIVIDUAL_POST_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async editIndividual(
    { commit },
    { id, name, fileUpload, description, userInfo }
  ) {
    commit("INDIVIDUAL_EDIT_REQUEST", {
      id,
      name,
      fileUpload,
      description,
      userInfo,
    });
    try {
      const { data } = await Axios.put(
        `/api/individual/${id}`,
        { name, image: fileUpload, description, isAdmin: userInfo.isAdmin },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      commit("INDIVIDUAL_EDIT_SUCCESS", data.individual);
    } catch (error) {
      commit(
        "INDIVIDUAL_EDIT_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async deleteIndividual({ commit }, { id, userInfo }) {
    console.log(id, userInfo);
    commit("INDIVIDUAL_DELETE_REQUEST", { id, userInfo });
    try {
      const { data } = await Axios.delete(`/api/individual/${id}`, {
        data: {
          isAdmin: userInfo.isAdmin,
        },
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      commit("INDIVIDUAL_DELETE_SUCCESS", data.message);
    } catch (error) {
      commit(
        "INDIVIDUAL_DELETE_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async individualUploadImage({ commit }, formData) {
    try {
      const response = await Axios.post(
        "/api/individual/uploadImage",
        formData,
        {
          header: { "content-type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        commit("INDIVIDUAL_IMAGE_UPLOAD", response.data.image);
      }
    } catch (error) {
      commit(
        "INDIVIDUAL_IMAGE_UPLOAD_FAIL",
        "Failed to save the Image in Server"
      );
    }
  },
  clearFirst({ commit }) {
    commit("CLEARIND");
  },
};
const mutations = {
  INDIVIDUAL_BROWSE_REQUEST: (state) => {
    state.loading = true;
  },
  INDIVIDUAL_BROWSE_SUCCESS: (state, payload) => {
    state.individuals = payload;
    state.loading = false;
  },
  INDIVIDUAL_BROWSE_FAIL: (state, payload) => {
    state.error = payload;
    state.loading = false;
  },
  INDIVIDUAL_DETAIL_REQUEST: (state) => {
    state.loading = true;
  },
  INDIVIDUAL_DETAIL_SUCCESS: (state, payload) => {
    state.individual = payload;
    state.loading = false;
  },
  INDIVIDUAL_DETAIL_FAIL: (state, payload) => {
    state.error = payload;
    state.loading = false;
  },
  INDIVIDUAL_POST_REQUEST: (state) => {
    state.loading = true;
  },
  INDIVIDUAL_POST_SUCCESS: (state, payload) => {
    state.individual = payload;
    state.loading = false;
    state.success = true;
  },
  INDIVIDUAL_POST_FAIL: (state, payload) => {
    state.error = payload;
    state.loading = false;
  },
  INDIVIDUAL_EDIT_REQUEST: (state) => {
    state.loadingEdit = true;
  },
  INDIVIDUAL_EDIT_SUCCESS: (state, payload) => {
    state.individual = payload;
    state.loadingEdit = false;
    state.successEdit = true;
  },
  INDIVIDUAL_EDIT_FAIL: (state, payload) => {
    state.errorEdit = payload;
    state.loadingEdit = false;
  },
  INDIVIDUAL_DELETE_REQUEST: (state) => {
    state.loadingDelete = true;
  },
  INDIVIDUAL_DELETE_SUCCESS: (state, payload) => {
    state.message = payload;
    state.loadingDelete = false;
    state.successDelete = true;
  },
  INDIVIDUAL_DELETE_FAIL: (state, payload) => {
    state.errorDelete = payload;
    state.loadingDelete = false;
  },
  INDIVIDUAL_IMAGE_UPLOAD: (state, payload) => {
    state.src = payload;
  },
  INDIVIDUAL_IMAGE_UPLOAD_FAIL: (state, payload) => {
    state.message = payload;
  },
  CLEARIND: (state) => {
    state.message = "";
    state.success = false;
    state.successEdit = false;
    state.successDelete = false;
    state.error = false;
    state.errorEdit = false;
    state.errorDelete = false;
  },
};
export default { state, getters, actions, mutations };
