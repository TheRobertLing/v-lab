import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/home-page/HomePage.vue";
import NetworkErrorPage from "@/pages/error-pages/NetworkErrorPage.vue";
import PageNotFoundPage from "@/pages/error-pages/PageNotFoundPage.vue";
import type { Component } from "vue";

export type ShowcaseRoute = {
  name: string;
  path: string;
  previewImgPath: string;
  component: () => Promise<Component>;
};

export type ShowcaseItem = Omit<ShowcaseRoute, "component">;

const showcases: ShowcaseRoute[] = [
  {
    name: "Bouncing DVD Logo",
    path: "/bouncing-dvd-logo",
    previewImgPath: "/showcase-images/bouncing-dvd-logo.svg",
    component: () => import("@/pages/showcases/bouncing-dvd-logo/BouncingDVDLogoPage.vue"),
  },
  {
    name: "Youtube Iframe Embed",
    path: "/youtube-iframe-embed",
    previewImgPath: "/showcase-images/youtube-iframe-embed.png",
    component: () => import("@/pages/showcases/youtube-iframe-embed/YouTubeIframeEmbedPage.vue"),
  },
];

export const showCaseList: ShowcaseItem[] = showcases.map((showcase) => ({
  name: showcase.name,
  path: showcase.path,
  previewImgPath: showcase.previewImgPath,
}));

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
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.onError(() => {
  router.push({ name: "NetworkError" });
});

export default router;
