<template>
  <div class="row">
    <div class="col-9 col-md-7 col-lg-6 mx-auto text-capitalize formdesign">
      <h4 class="text-center">login</h4>
      <div v-if="loadingUser">loading ...</div>
      <div v-if="errorUser">{{ errorUser }}</div>
      <form>
        <div class="inputdesign">
          <label for="">user name</label>
          <input
            v-model="username"
            type="text"
            placeholder="enter your user name"
            name="username"
            required
          />
        </div>
        <div class="inputdesign">
          <label for="">password</label>
          <input
            v-model="password"
            type="password"
            placeholder="enter your password"
            name="password"
            required
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

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["signIn", "clear"]),
    handleSubmit(e) {
      e.preventDefault();
      this.signIn({ username: this.username, password: this.password });
    },
  },
  computed: {
    ...mapGetters(["loadingUser", "errorUser", "userInfo"]),
  },
  watch: {
    userInfo(newValue) {
      if (newValue) {
        this.$router.push("/");
      } else {
        this.clear();
      }
    },
  },
};
</script>

<style></style>
