<template>
  <div class="star">
    <i
      v-for="num in Math.floor(stars)"
      v-bind:key="num"
      class="fas fa-star"
    ></i>
    <i v-if="stars % 1 !== 0" class="fas fa-star-half-alt"></i>
    <i
      v-for="num in 5 - Math.ceil(stars)"
      v-bind:key="num"
      class="far fa-star"
    ></i>
  </div>
</template>

<script>
export default {
  props: ["stars"],
};
</script>

<style></style>
