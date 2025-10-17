import { useElementSize, useRafFn } from "@vueuse/core";
import { onBeforeUnmount, onMounted, reactive, ref, type Ref } from "vue";

interface Position {
  xPos: number;
  yPos: number;
}

interface Velocity {
  xVel: number;
  yVel: number;
}

export function useBouncingDVDLogo(
  boundingBox: Ref<HTMLElement | null>,
  logoBox: Ref<HTMLElement | null>,
) {
  const color = ref(getRandomColor());
  const { width: boundingWidth, height: boundingHeight } = useElementSize(boundingBox);
  const { width: logoWidth, height: logoHeight } = useElementSize(logoBox);
  const position = reactive<Position>({ xPos: 0, yPos: 0 });
  const velocity = reactive<Velocity>({ xVel: 100, yVel: 100 });

  const { pause, resume } = useRafFn(
    ({ delta }) => {
      const MILLISECONDS = 1000;

      let newXPos = position.xPos + (velocity.xVel / MILLISECONDS) * delta;
      let newYPos = position.yPos + (velocity.yVel / MILLISECONDS) * delta;
      let newXVel = velocity.xVel;
      let newYVel = velocity.yVel;
      let shouldChangeColor = false;

      if (newXPos + logoWidth.value >= boundingWidth.value || newXPos <= 0) {
        newXVel *= -1;
        newXPos = Math.max(0, Math.min(newXPos, boundingWidth.value - logoWidth.value));
        shouldChangeColor = true;
      }

      if (newYPos + logoHeight.value >= boundingHeight.value || newYPos <= 0) {
        newYVel *= -1;
        newYPos = Math.max(0, Math.min(newYPos, boundingHeight.value - logoHeight.value));
        shouldChangeColor = true;
      }

      position.xPos = newXPos;
      position.yPos = newYPos;
      velocity.xVel = newXVel;
      velocity.yVel = newYVel;
      if (shouldChangeColor) color.value = getRandomColor();
    },
    { immediate: false },
  );

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    return color;
  }

  onMounted(() => {
    resume();
  });

  onBeforeUnmount(() => {
    pause();
  });

  return { position, color };
}
