import type { CSSProperties, Ref } from "vue";
import { useEventListener, useScreenSafeArea, useWindowSize } from "@vueuse/core";
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import { clamp, pixelToNumber } from "../utils";
import { useFrameState } from "./state";

function snapToPoints(value: number) {
  const SNAP_THRESHOLD = 2;

  if (value < 5) return 0;
  if (value > 95) return 100;
  if (Math.abs(value - 50) < SNAP_THRESHOLD) return 50;
  return value;
}

export function usePosition(panelEl: Ref<HTMLElement | undefined>) {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { state, updateState } = useFrameState();
  const isHovering = ref(false);
  const isDragging = ref(false);
  const draggingOffset = reactive({ x: 0, y: 0 });
  const mousePosition = reactive({ x: 0, y: 0 });
  const panelMargins = reactive({
    left: 10,
    top: 10,
    right: 10,
    bottom: 10,
  });
  let _timer: ReturnType<typeof setTimeout> | null = null;

  const safeArea = useScreenSafeArea();

  watchEffect(() => {
    panelMargins.left = pixelToNumber(safeArea.left.value) + 10;
    panelMargins.top = pixelToNumber(safeArea.top.value) + 10;
    panelMargins.right = pixelToNumber(safeArea.right.value) + 10;
    panelMargins.bottom = pixelToNumber(safeArea.bottom.value) + 10;
  });

  const onPointerDown = (e: PointerEvent) => {
    isDragging.value = true;
    const { left, top, width, height } = panelEl.value!.getBoundingClientRect();

    // This calculates the position vector of the mouse pointer relative to the center of the panel
    draggingOffset.x = e.clientX - left - width / 2;
    draggingOffset.y = e.clientY - top - height / 2;
  };

  const bringUp = () => {
    isHovering.value = true;
    if (state.value.minimizePanelInactive < 0) return;
    if (_timer) clearTimeout(_timer);
    _timer = setTimeout(() => {
      isHovering.value = false;
    }, +state.value.minimizePanelInactive || 0);
  };

  onMounted(() => {
    bringUp();
  });

  useEventListener("pointerup", () => {
    isDragging.value = false;
  });
  useEventListener("pointerleave", () => {
    isDragging.value = false;
  });
  useEventListener("pointermove", (e) => {
    if (!isDragging.value) return;

    // Calculates the center of the viewport
    const centerX = windowWidth.value / 2;
    const centerY = windowHeight.value / 2;


    // Gets the current mouse position and subtracts it from the mouse position on click relative to the
    // center of the panel

    // Mouse position represents where the center of the panel is supposed to be.
    const x = e.clientX - draggingOffset.x;
    const y = e.clientY - draggingOffset.y;

    // Ignore, not relevant
    mousePosition.x = x;
    mousePosition.y = y;

    // Calculates the quadrants
    const deg = Math.atan2(y - centerY, x - centerX);
    const HORIZONTAL_MARGIN = 70;
    const TL = Math.atan2(0 - centerY + HORIZONTAL_MARGIN, 0 - centerX);
    const TR = Math.atan2(0 - centerY + HORIZONTAL_MARGIN, windowWidth.value - centerX);
    const BL = Math.atan2(windowHeight.value - HORIZONTAL_MARGIN - centerY, 0 - centerX);
    const BR = Math.atan2(
      windowHeight.value - HORIZONTAL_MARGIN - centerY,
      windowWidth.value - centerX,
    );

    // Determines based on the centre of the panel where to position
    // Its possible for the mouse to move way past the viewport but this still calculates the quadrant
    updateState({
      position:
        deg >= TL && deg <= TR
          ? "top"
          : deg >= TR && deg <= BR
            ? "right"
            : deg >= BR && deg <= BL
              ? "bottom"
              : "left",

      // Expressed as a percentage of the viewport
      left: snapToPoints((x / windowWidth.value) * 100),
      top: snapToPoints((y / windowHeight.value) * 100),
    });
  });

  const isVertical = computed(
    () => state.value.position === "left" || state.value.position === "right",
  );

  // Not relevant
  const isHidden = computed(() => {
    if (state.value.minimizePanelInactive < 0) return false;
    if (state.value.minimizePanelInactive === 0) return true;
    // @ts-expect-error compatibility
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    return (
      !isDragging.value &&
      !state.value.open &&
      !isHovering.value &&
      !isTouchDevice &&
      state.value.minimizePanelInactive
    );
  });

  const anchorPos = computed(() => {
    const halfWidth = (panelEl.value?.clientWidth || 0) / 2;
    const halfHeight = (panelEl.value?.clientHeight || 0) / 2;

    const left = (state.value.left * windowWidth.value) / 100;
    const top = (state.value.top * windowHeight.value) / 100;

    switch (state.value.position) {
      case "top":
        return {
          left: clamp(
            left,
            halfWidth + panelMargins.left,
            windowWidth.value - halfWidth - panelMargins.right,
          ),
          top: panelMargins.top + halfHeight,
        };
      case "right":
        return {
          left: windowWidth.value - panelMargins.right - halfHeight,
          top: clamp(
            top,
            halfWidth + panelMargins.top,
            windowHeight.value - halfWidth - panelMargins.bottom,
          ),
        };
      case "left":
        return {
          left: panelMargins.left + halfHeight,
          top: clamp(
            top,
            halfWidth + panelMargins.top,
            windowHeight.value - halfWidth - panelMargins.bottom,
          ),
        };
      case "bottom":
      default:
        return {
          left: clamp(
            left,
            halfWidth + panelMargins.left,
            windowWidth.value - halfWidth - panelMargins.right,
          ),
          top: windowHeight.value - panelMargins.bottom - halfHeight,
        };
    }
  });

  const anchorStyle = computed(() => ({
    left: `${anchorPos.value.left}px`,
    top: `${anchorPos.value.top}px`,
  }));

  const panelStyle = computed(() => {

    // The state.value.position only controls whether to minimise the panel icon or not.
    const style: any = {
      transform: isVertical.value
        ? `translate(${isHidden.value ? `calc(-50% ${state.value.position === "right" ? "+" : "-"} 15px)` : "-50%"}, -50%) rotate(90deg)`
        : `translate(-50%, ${isHidden.value ? `calc(-50% ${state.value.position === "top" ? "-" : "+"} 15px)` : "-50%"})`,
    };

    // This removes the border radius so the hidden panel looks like a half circle
    if (isHidden.value) {
      switch (state.value.position) {
        case "top":
        case "right":
          style.borderTopLeftRadius = "0";
          style.borderTopRightRadius = "0";
          break;
        case "bottom":
        case "left":
          style.borderBottomLeftRadius = "0";
          style.borderBottomRightRadius = "0";
          break;
      }
    }
    if (isDragging.value) style.transition = "none !important";
    return style;
  });

  return {
    isHidden,
    isDragging,
    isVertical,
    anchorStyle,
    panelStyle,
    onPointerDown,
    bringUp,
  };
}
