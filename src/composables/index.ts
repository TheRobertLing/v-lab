import { ref, watch } from "vue";

// Composables for the base application
export function useDark() {
  const q = window.matchMedia("(prefers-color-scheme: dark)");
  const stored = localStorage.getItem("vui-theme");

  const theme = ref(stored ? stored : q.matches ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme.value === "dark");
  localStorage.setItem("vui-theme", theme.value);

  function toggleDark() {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }

  watch(theme, (val) => {
    document.documentElement.classList.toggle("dark", val === "dark");
    localStorage.setItem("vui-theme", val);
  });

  return { theme, toggleDark }
}
