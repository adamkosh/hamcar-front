import { authStore } from "~~/stores/auth.store";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = authStore();

  if (store.isLogin == false) {
    return navigateTo("/auth/login");
  }
});
