import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import CreateIndPage from "./pages/CreateIndPage";
import EditIndPage from "./pages/EditIndPage";
import store from "./store/index";

const routes = [
  { path: "/", component: HomePage },
  { path: "/search", component: SearchPage },
  {
    path: "/individual/:id",
    component: DetailPage,
  },

  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/admin-register", component: AdminRegisterPage },

  {
    path: "/create-individual",
    component: CreateIndPage,
    beforeEnter: (_, __, next) => {
      if (store.getters.userInfo === null) {
        next("/login");
      }
      next();
    },
  },
  {
    path: "/individual/:id/edit",
    component: EditIndPage,
    beforeEnter: (_, __, next) => {
      if (store.getters.userInfo === null) {
        next("/login");
      }
      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
