import { createApp } from "vue";
import "@/assets/main.css";
import App from "./App.vue";
import router from "@/routes";
import { createManager } from "@vue-youtube/core";

const app = createApp(App);
app.use(createManager())
app.use(router);
app.mount("#app");
