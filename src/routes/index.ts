import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/home-page/HomePage.vue";
import NetworkErrorPage from "@/pages/error-pages/NetworkErrorPage.vue";
import PageNotFoundPage from "@/pages/error-pages/PageNotFoundPage.vue";

export type ShowcaseRoute = RouteRecordRaw & {
  previewImgPath: string;
};

export interface ShowcaseItem {
  name: string;
  path: string;
  previewImgPath: string;
}

const showcases: ShowcaseRoute[] = [
  {
    name: "Bouncing DVD Logo",
    path: "/bouncing-dvd-logo",
    previewImgPath: "/showcase-images/bouncing-dvd-logo.svg",
    component: () => import("@/pages/showcases/bouncing-dvd-logo/BouncingDVDLogoPage.vue"),
  },
];

export function getShowcaseList(): ShowcaseItem[] {
  return showcases.map((showcase) => ({
    name: String(showcase.name),
    path: showcase.path,
    previewImgPath: showcase.previewImgPath,
  }));
}

const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: HomePage,
  },

  ...showcases,

  {
    name: "Network Error",
    path: "/network-error",
    component: NetworkErrorPage,
  },
  {
    name: "Not Found",
    path: "/:pathMatch(.*)*",
    component: PageNotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.onError((error) => {
  console.error("Router error:", error);
  router.push({ name: "NetworkError" });
});

export default router;
