<template>
  <div>
    <div v-if="loading">loading...</div>

    <div v-if="error">{{ error }}</div>

    <section v-if="!loading && !error" id="showSearching">
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <div class="p-4 bg-white">
              <h4>Find by name</h4>
              <form v-on:submit.prevent="handleSearchName">
                <input
                  v-model="searchName"
                  type="text"
                  placeholder="type name ..."
                />
              </form>
            </div>
          </div>
          <div class="col-md-5">
            <div class="p-4 bg-white">
              <h4>Sort</h4>
              <form>
                <select
                  v-bind:value="selection"
                  v-on:change.prevent="handleSelect"
                >
                  <option value="">-- select --</option>
                  <option value="highestRate">
                    Rating (highest first)
                  </option>
                  <option value="lowestRate">Rating (lowest first)</option>
                  <option value="newest">Date (newest first)</option>
                  <option value="oldest">Date (oldest first)</option>
                  <option value="abc">Name (ascending)</option>
                  <option value="z">Name (descending)</option>
                </select>
              </form>
            </div>
          </div>
          <div class="col-md-2">
            <form>
              <button v-on:click.prevent="handleReset" type="submit">
                Reset
              </button>
            </form>
          </div>

          <div
            v-if="(!foundByName && !foundBySelect) || clearFilter"
            class="row"
          >
            <Each
              v-for="individual in individuals"
              v-bind:key="individual._id"
              v-bind:individual="individual"
            />
          </div>
          <div v-if="foundByName && !foundBySelect" class="row">
            <Each
              v-for="individual in foundByName"
              v-bind:key="individual._id"
              v-bind:individual="individual"
            />
          </div>
          <div v-if="foundBySelect" class="row">
            <Each
              v-for="individual in foundBySelect"
              v-bind:key="individual._id"
              v-bind:individual="individual"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Each from "../components/Each";

export default {
  data() {
    return {
      searchName: "",
      selection: "",
      foundByName: "",
      foundBySelect: "",
      search: "",
      newIndividuals: null,
      clearFilter: false,
    };
  },
  components: {
    Each,
  },
  methods: {
    ...mapActions(["individualBrowse"]),
    handleSelect(e) {
      this.clearFilter = false;
      this.searchName = "";
      this.selection = e.target.value;
      this.$router.push("/search");
    },
    handleReset() {
      this.$router.push("/search");
      this.clearFilter = true;
    },
    handleSearchName() {
      this.clearFilter = false;
      this.$router.push(`/search?s=${this.searchName}`);

      this.selection = "";
    },
  },
  computed: {
    ...mapGetters(["loading", "error", "individuals"]),
  },
  created() {
    this.individualBrowse();
  },
  beforeUpdate() {
    if (this.individuals) {
      this.newIndividuals = this.individuals;
    }
    if (this.newIndividuals) {
      for (let i = 0; i < this.newIndividuals.length; i++) {
        if (this.newIndividuals[i].rates.length >= 2) {
          this.newIndividuals[i].stars =
            this.newIndividuals[i].rates.reduce(
              (int, currentValue) => parseInt(int + currentValue.rating),
              [0]
            ) / this.newIndividuals[i].rates.length;
        } else if (this.newIndividuals[i].rates.length === 1) {
          this.newIndividuals[i].stars = this.newIndividuals[i].rates[0].rating;
        } else {
          this.newIndividuals[i].stars = 0;
        }
      }
    }

    this.search = this.$route.query.s;
    if (this.search && this.individuals) {
      this.foundByName = this.individuals.filter(
        (each) => each.name.indexOf(this.search) !== -1
      );
    }
  },
  watch: {
    selection(newValue) {
      switch (newValue) {
        case "highestRate":
          this.foundBySelect = this.newIndividuals?.sort(
            (indA, indB) => indB.stars - indA.stars
          );

          break;
        case "lowestRate":
          this.foundBySelect = this.newIndividuals?.sort(
            (indA, indB) => indA.stars - indB.stars
          );
          break;
        case "newest":
          this.foundBySelect = this.newIndividuals?.sort(
            (indA, indB) => new Date(indA.updatedAt) - new Date(indB.updatedAt)
          );
          break;
        case "oldest":
          this.foundBySelect = this.newIndividuals?.sort(
            (indA, indB) => new Date(indB.updatedAt) - new Date(indA.updatedAt)
          );
          break;
        case "abc":
          this.foundBySelect = this.newIndividuals?.sort((indA, indB) =>
            indA.name.localeCompare(indB.name)
          );
          break;
        case "z":
          this.foundBySelect = this.newIndividuals?.sort((indA, indB) =>
            indB.name.localeCompare(indA.name)
          );
          break;
        case "":
          this.foundBySelect = "";
          break;
        default:
          this.foundBySelect = "";
      }
    },
  },
};
</script>

<style></style>
