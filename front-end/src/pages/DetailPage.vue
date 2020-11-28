<template>
  <div>
    <div v-if="loading">loading...</div>
    <div v-if="error">{{ error }}</div>
    <section v-if="!loading && !error" class="detail">
      <div class="container py-4">
        <div class="row top">
          <div class="col-6 px-3">
            <div class="mr-3 px-3">
              <img
                v-if="person.image"
                v-bind:src="'http://localhost:8000/' + person.image"
                v-bind:alt="person.name"
                width="100%"
                id="hinh"
              />

              <div v-if="userInfo?.isAdmin" class="d-flex add">
                <router-link
                  v-bind:to="{ path: '/individual/' + person._id + '/edit' }"
                  >Edit</router-link
                >

                <button v-on:click="handleDelete(person._id, userInfo)">
                  Delete
                </button>
                <div v-if="loadingDelete">loading ...</div>
                <div v-if="errorDelete">{{ errorDelete }}</div>
              </div>
            </div>
          </div>

          <!-- summary info of individual  -->
          <div class="col-6 ">
            <div
              class="rate__information px-2 bg-white border border-secondary"
            >
              <div>Name: {{ person.name }}</div>
              <hr />
              <div>Description: {{ person.description }}</div>
              <hr />
              <div v-if="person.rates?.length === 0">No rates yet</div>

              <div v-if="person.rates?.length !== 0">
                <span v-if="person.rates?.length === 1">1 rating</span>

                <span v-if="person.rates?.length > 1"
                  >{{ person.rates?.length }} ratings
                </span>

                <span
                  >{{ "  " }}
                  {{
                    (
                      person?.rates?.reduce(
                        (int, currentValue) =>
                          parseInt(int + currentValue.rating),
                        [0]
                      ) / person?.rates?.length
                    ).toFixed(2)
                  }}
                  / 5 stars
                </span>

                <StarsRate
                  v-bind:stars="
                    person?.rates?.reduce(
                      (int, currentValue) =>
                        parseInt(int + currentValue.rating),
                      [0]
                    ) / person?.rates?.length
                  "
                />
              </div>

              <hr />
            </div>
          </div>

          <div class="bg-white detail__rate col-9 my-2 p-3">
            <div
              v-if="
                userInfo !== null &&
                  person.rates?.find((rate) => rate.author._id === userInfo._id)
              "
              v-on:click="showRate"
              class="rate btn__rate text-center p-2 mb-2"
            >
              View your rate
            </div>

            <div
              v-if="
                userInfo &&
                  !person.rates?.find(
                    (rate) => rate.author._id === userInfo._id
                  )
              "
              class="parentTextarea"
            >
              <FormRating
                v-bind:individualId="person._id"
                v-on:handle-rate-submit="handleRate"
              />
            </div>

            <div v-if="person?.rates?.length !== 0">
              <div v-for="rate in person.rates" v-bind:key="rate._id">
                <hr />
                <div class="row">
                  <div class="col-4">
                    <div>Rate by {{ rate.author.username }}</div>
                    <div>
                      <em>{{ new Date(rate.updatedAt).toDateString() }}</em>
                    </div>
                    <div>{{ rate.rating }} out of 5</div>
                  </div>
                  <div class="col-8">
                    <div>{{ rate.text }}</div>

                    <div
                      ref="rating"
                      v-if="userInfo?._id === rate.author._id"
                      class="d-flex justify-content-end adjustRate"
                    >
                      <div class="editBtn">
                        <button v-on:click="showEditForm" class="blue">
                          edit
                        </button>
                      </div>
                      <div>
                        <button
                          v-on:click="handleRateDelete(rate?._id, id, userInfo)"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                <div
                  ref="box"
                  v-if="userInfo !== null && userInfo._id === rate.author._id"
                  v-bind:style="hide"
                >
                  <div class="d-flex justify-content-between">
                    <p>Edit your rating</p>
                    <p v-on:click="closeEditForm" class="cursor">
                      Close
                    </p>
                  </div>

                  <FormRating
                    v-bind:individualId="id"
                    v-bind:rateId="rate._id"
                    v-bind:preRate="rate.rating"
                    v-bind:preText="rate.text"
                    v-on:handle-rate-submit="handleRate"
                    v-on:handle-rate-edit="handleRateEdit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StarsRate from "../components/StarsRate";
import FormRating from "../components/FormRating";

export default {
  components: {
    StarsRate,
    FormRating,
  },
  data() {
    return {
      id: this.$route.params.id,
      person: {},
      hide: { display: "none" },
    };
  },
  methods: {
    ...mapActions([
      "detailIndividual",
      "deleteIndividual",
      "clearFirst",
      "ratePost",
      "rateEdit",
      "rateDelete",
    ]),
    handleDelete(individualId, userInfo) {
      this.deleteIndividual({ id: individualId, userInfo });
      if (this.$refs.box) {
        this.$refs.box.style.display = "none";
      }
    },

    handleRate({ individualId, rating, text, userInfo }) {
      this.ratePost({ individualId, rating, text, userInfo });
    },
    handleRateEdit({ rateId, rating, text, individualId, userInfo }) {
      this.rateEdit({ rateId, rating, text, individualId, userInfo });
      if (this.$refs.box) {
        this.$refs.box.style.display = "none";
      }
    },
    handleRateDelete(rateId, individualId, userInfo) {
      this.rateDelete({ rateId, individualId, userInfo });
    },
    showRate() {
      if (this.$refs.rating) {
        this.$refs.rating.scrollIntoView({ behavior: "smooth" });
      }
    },
    showEditForm() {
      if (this.$refs.box) {
        this.$refs.box.style.display = "block";
      }
    },
    closeEditForm() {
      if (this.$refs.box) {
        this.$refs.box.style.display = "none";
      }
    },
  },
  computed: {
    ...mapGetters([
      "loading",
      "error",
      "individual",
      "loadingDelete",
      "errorDelete",
      "message",
      "updatedIndividual",
      "userInfo",
    ]),
  },

  created() {
    this.detailIndividual(this.id);
    this.clearFirst();
  },
  watch: {
    individual(newValue) {
      if (newValue) {
        this.person = newValue;
      }
    },
    updatedIndividual(newValue) {
      if (newValue) {
        this.person = newValue;
      }
    },
    message(newValue) {
      if (newValue) {
        this.$router.push("/search");
      }
    },
  },
};
</script>

<style></style>
