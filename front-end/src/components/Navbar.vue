<template>
  <nav class="nav">
    <div class="nav__title">
      <router-link to="/">
        <div>hype.you.up</div>
      </router-link>
      <div v-on:click="handleNav" class="nav__icon">
        <i class="fas fa-bars"></i>
      </div>
    </div>

    <div v-bind:class="`nav__route ${slidedown && 'open'}`">
      <router-link to="/register" v-if="!userInfo">register</router-link>

      <div v-if="userInfo">
        <span> Hello {{ userInfo.username }}</span>
        <router-link to="#" v-on:click="handleLogout">
          logout
        </router-link>
      </div>

      <router-link to="/login" v-if="!userInfo">login</router-link>
      <router-link to="/create-individual" v-if="userInfo?.isAdmin"
        >post</router-link
      >
      <router-link to="/search">search</router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      slidedown: false,
    };
  },
  methods: {
    ...mapActions(["signOut", "clear"]),
    handleLogout() {
      this.signOut();
    },
    handleNav() {
      if (this.slidedown) {
        this.slidedown = false;
      } else {
        this.slidedown = true;
      }
    },
  },
  created() {
    if (!this.userInfo) {
      this.clear();
    }
  },
  computed: mapGetters(["userInfo"]),
  watch: {
    userInfo(newValue) {
      if (newValue) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
