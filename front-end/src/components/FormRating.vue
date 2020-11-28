<template>
  <form>
    <fieldset class="starability-basic">
      <input
        v-model="rating"
        v-bind:checked="rating === '0'"
        type="radio"
        id="no-rate"
        class="input-no-rate"
        name="rating"
        value="0"
        aria-label="No rating."
      />
      <input
        v-model="rating"
        v-bind:checked="rating === '1'"
        type="radio"
        id="first-rate1"
        name="rating"
        value="1"
      />
      <label for="first-rate1" title="Terrible">
        1 star
      </label>
      <input
        v-model="rating"
        v-bind:checked="rating === '2'"
        type="radio"
        id="first-rate2"
        name="rating"
        value="2"
      />
      <label for="first-rate2" title="Not good">
        2 stars
      </label>
      <input
        v-model="rating"
        v-bind:checked="rating === '3'"
        type="radio"
        id="first-rate3"
        name="rating"
        value="3"
      />
      <label for="first-rate3" title="Average">
        3 stars
      </label>
      <input
        v-model="rating"
        v-bind:checked="rating === '4'"
        type="radio"
        id="first-rate4"
        name="rating"
        value="4"
      />
      <label for="first-rate4" title="Very good">
        4 stars
      </label>
      <input
        v-model="rating"
        v-bind:checked="rating === '5'"
        type="radio"
        id="first-rate5"
        name="rating"
        value="5"
      />
      <label for="first-rate5" title="Amazing">
        5 stars
      </label>
    </fieldset>
    <textarea
      v-model="text"
      id=""
      rows="7"
      v-bind:style="objectStyle"
      v-bind:placeholder="preText ? '' : 'write your rating ...'"
    ></textarea>

    <button
      v-if="!preRate && !preText"
      v-on:click.prevent="
        $emit('handle-rate-submit', { individualId, rating, text, userInfo })
      "
      class="buttondesign"
    >
      submit
    </button>

    <button
      v-if="preRate && preText"
      v-on:click.prevent="
        $emit('handle-rate-edit', {
          rateId,
          rating,
          text,
          individualId,
          userInfo,
        })
      "
      class="buttondesign"
    >
      update
    </button>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      rating: "0",
      text: "",
      objectStyle: {
        resize: "none",
        width: "100%",
      },
    };
  },
  computed: mapGetters(["userInfo"]),
  props: ["individualId", "rateId", "preRate", "preText"],
  created() {
    if (this.preRate && this.preText) {
      this.rating = this.preRate.toString();
      this.text = this.preText;
    }
  },
};
</script>

<style></style>
