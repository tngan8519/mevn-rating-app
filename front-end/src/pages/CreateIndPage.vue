<template>
  <div class="row">
    <div
      class="col-9 col-sm-6 col-md-7 col-lg-6 mx-auto text-capitalize formdesign"
    >
      <h4 class="text-center">create new individual</h4>
      <div v-if="loading">loading...</div>
      <div v-if="error">{{ error }}</div>
      <form>
        <div class="inputdesign">
          <label for="name">name</label>
          <input
            v-model="name"
            type="text"
            placeholder="enter name"
            id="name"
          />
        </div>
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
          <input
            v-model="description"
            type="text"
            placeholder="enter description"
            name="description"
            id="description"
          />
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
      name: "",
      description: "",
      fileUpload: "",
    };
  },
  methods: {
    ...mapActions(["individualPost", "individualUploadImage", "clearFirst"]),
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

      this.individualPost({
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
      "message",
      "success",
      "src",
      "userInfo",
    ]),
  },
  created() {
    this.clearFirst();
  },
  watch: {
    success(newValue) {
      if (newValue) {
        this.$router.push("/search");
      }
    },
    src(newValue) {
      this.fileUpload = newValue;
    },
  },
};
</script>

<style></style>
