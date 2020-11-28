<template>
  <div class="row">
    <div
      class="col-9 col-sm-6 col-md-7 col-lg-6 mx-auto text-capitalize formdesign"
    >
      <h4 class="text-center">edit individual {{ individual.name }}</h4>
      <div v-if="loading">loading...</div>
      <div v-if="error">{{ error }}</div>
      <form>
        <div class="inputdesign">
          <label for="name">name</label>
          <input v-model="name" type="text" id="name" />
        </div>
        <img
          v-if="individual.image"
          v-bind:src="'http://localhost:8000/' + individual.image"
          alt=""
          class="post__img"
        />
        <div class="inputdesign">
          <label for="pic">file</label>
          <input type="file" v-on:input="handleFile" id="pic" />
        </div>
        <img
          v-if="fileUpload"
          v-bind:src="'http://localhost:8000/' + fileUpload"
          class="post__img"
          alt=""
        />

        <div class="inputdesign">
          <label for="description">description</label>
          <input v-model="description" type="text" id="description" />
        </div>

        <button v-on:click="handleSubmit" type="submit" class="buttondesign">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Axios from "../axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      name: "",
      description: "",
      fileUpload: "",
    };
  },
  methods: {
    ...mapActions([
      "detailIndividual",
      "editIndividual",
      "individualUploadImage",
      "clearFirst",
    ]),
    handleFile(e) {
      if (this.fileUpload) {
        Axios.post("/api/individual/deleteImage", {
          fileName: this.fileUpload,
        }).then((response) => console.log(response));
      }
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      this.individualUploadImage(formData);
    },
    handleSubmit(e) {
      e.preventDefault();

      this.editIndividual({
        id: this.id,
        name: this.name,
        fileUpload: this.fileUpload,
        description: this.description,
        userInfo: this.userInfo,
      });
    },
  },
  computed: {
    ...mapGetters([
      "loading",
      "error",
      "individual",
      "success",
      "successEdit",
      "src",
      "userInfo",
    ]),
  },
  created() {
    this.detailIndividual(this.id);
    this.clearFirst();
  },

  watch: {
    individual(newValue) {
      if (Object.keys(newValue).length !== 0) {
        this.name = newValue.name;
        this.description = newValue.description;
      }
    },
    successEdit(newValue) {
      if (newValue === true) {
        this.$router.push(`/individual/${this.id}`);
      }
    },
    src(newValue) {
      if (newValue) {
        this.fileUpload = newValue;
      }
    },
  },
};
</script>

<style></style>
