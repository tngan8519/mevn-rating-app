import Vuex from "vuex";
import individual from "./modules/individual";
import rate from "./modules/rate";
import user from "./modules/user";

const store = new Vuex.Store({
  modules: { individual, rate, user },
});

export default store;
