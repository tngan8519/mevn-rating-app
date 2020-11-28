<template>
  <div>
    <section
      id="quicklySearch"
      class="d-flex justify-content-center align-items-center text-center"
    >
      <div>
        <div class="text-uppercase text-white word">quickly search</div>
        <form>
          <div class="searching d-flex">
            <input v-model="input" type="text" />

            <div class="d-flex justify-content-center align-items-center">
              <button v-on:click="handleSearch" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <section id="aboutus">
      <div class="container">
        <div class="introduce">
          <div class="text-capitalize about">about us</div>

          <div class="row align-items-center">
            <div class="col-md-6 text-center order-md-2 py-3">
              <div class="px-3">
                We build a functioning human reputation score webpage
              </div>
            </div>
            <div class="col-md-6 py-3 order-md-1 text-center star">
              <StarsRate v-bind:stars="3.5" />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-6 text-center order-md-3 py-3">
              <div class="px-3">
                We help to find the person you are dealing with
              </div>
            </div>
            <div class="col-md-6 py-3 order-md-4 text-center">
              <i
                v-bind:style="styleObject"
                class="fas fa-american-sign-language-interpreting"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StarsRate from "../components/StarsRate";

export default {
  data() {
    return {
      input: "",
      styleObject: {
        fontSize: "40px",
        color: "blue",
      },
    };
  },
  components: {
    StarsRate,
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.$router.push(`/search?s=${this.input}`);
      this.input = "";
    },
  },
};
</script>

<style></style>
