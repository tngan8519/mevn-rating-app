<template>
  <div class="col-10 mx-auto my-3 col-md-6 col-lg-4">
    <div v-bind:class="top ? 'top__rated' : 'singleRating bg-white mt-4'">
      <div class="imgContainer">
        <router-link v-bind:to="'/individual/' + individual._id">
          <img
            v-if="individual.image"
            v-bind:src="'http://localhost:8000/' + individual.image"
            v-bind:alt="individual.name"
            v-bind:style="imgStyle"
          />
        </router-link>
      </div>
      <div>
        <div v-if="individual.rates?.length === 0" class="text-center">
          No ratings yet
        </div>

        <div class="text-center">
          <StarsRate
            v-if="individual.rates?.length > 0"
            v-bind:stars="
              individual?.rates.reduce(
                (int, currentValue) => parseInt(int + currentValue.rating),
                [0]
              ) / individual?.rates?.length
            "
          />

          <div>
            <small>
              Updated at: {{ new Date(individual.updatedAt).toUTCString() }}
            </small>
          </div>
        </div>

        <div class="p-2">
          <div>{{ individual.name }}</div>
          <div>{{ individual.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarsRate from "../components/StarsRate";
export default {
  components: {
    StarsRate,
  },
  data() {
    return {
      imgStyle: {
        width: "100%",
        objectFit: "cover",
      },
    };
  },
  props: ["individual", "top"],
};
</script>

<style></style>
