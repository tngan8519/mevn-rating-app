<template>
  <div class="row">
    <div class="col-9 col-md-7 col-lg-6 mx-auto text-capitalize formdesign">
      <h4 class="text-center">Admin register</h4>
      <div v-if="loadingUser">loading ...</div>
      <div v-if="errorUser">{{ errorUser }}</div>
      <form>
        <div class="inputdesign">
          <label for="username">user name</label>
          <input
            v-model="username"
            type="text"
            placeholder="enter your user name"
            id="username"
            required
          />
        </div>
        <div class="inputdesign">
          <label for="password">password</label>
          <input
            v-model="password"
            type="password"
            placeholder="enter your password"
            id="password"
            required
          />
        </div>
        <div class="inputdesign">
          <label for="adminCode">admin code</label>
          <input
            v-model="adminCode"
            type="password"
            placeholder="enter admin code"
            id="adminCode"
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
      adminCode: "",
    };
  },
  methods: {
    ...mapActions(["register", "clear"]),
    handleSubmit(e) {
      e.preventDefault();

      this.register({
        username: this.username,
        password: this.password,
        adminCode: this.adminCode,
      });
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
