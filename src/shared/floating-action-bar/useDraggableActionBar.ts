import { onBeforeUnmount, onMounted, reactive, type Ref } from "vue";

export function useDraggableActionBar(actionBar: Ref<HTMLElement | null>) {
  const actionBarPosition = reactive({ x: 0, y: 0 });
  const cursorPosition = reactive({ x: 0, y: 0 });

  function handleMouseDown(e: MouseEvent) {
    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    const displacementX = e.clientX - cursorPosition.x;
    const displacementY = e.clientY - cursorPosition.y;

    actionBarPosition.x = Math.max(
      0,
      Math.min(
        actionBarPosition.x + displacementX,
        window.innerWidth - actionBar.value!.offsetWidth,
      ),
    );

    actionBarPosition.y = Math.max(
      0,
      Math.min(
        actionBarPosition.y + displacementY,
        window.innerHeight - actionBar.value!.offsetHeight,
      ),
    );

    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;
  }

  function handleMouseUp() {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  function handleResize() {
    const maxX = window.innerWidth - (actionBar.value?.offsetWidth ?? 0);
    const maxY = window.innerHeight - (actionBar.value?.offsetHeight ?? 0);
    if (actionBarPosition.x > maxX) actionBarPosition.x = maxX;
    if (actionBarPosition.y > maxY) actionBarPosition.y = maxY;
  }

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });

  return {
    actionBarPosition,
    cursorPosition,
    handleMouseDown,
  };
}
