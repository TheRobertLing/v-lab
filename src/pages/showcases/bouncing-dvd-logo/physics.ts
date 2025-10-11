import { onBeforeUnmount, onMounted, reactive, ref, watch, type Ref } from "vue";

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
  const MILLISECONDS = 1000;
  const cornerHitCount = ref(0);
  const color = ref(getRandomColor());

  const boundingDimensions = reactive({ width: 0, height: 0 });
  const logoDimensions = reactive({ width: 0, height: 0 });
  const position = reactive<Position>({ xPos: 0, yPos: 0 });
  const velocity = reactive<Velocity>({ xVel: 100, yVel: 100 });

  let boundingObserver: ResizeObserver | null = null;
  let logoObserver: ResizeObserver | null = null;
  let animationId: number | null = null;
  let lastTime = 0;

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function update(currentTime: number) {
    const deltaTime = lastTime ? currentTime - lastTime : 0;
    lastTime = currentTime;

    position.xPos += (velocity.xVel / MILLISECONDS) * deltaTime;
    position.yPos += (velocity.yVel / MILLISECONDS) * deltaTime;

    if (position.xPos + logoDimensions.width >= boundingDimensions.width || position.xPos <= 0) {
      velocity.xVel *= -1;

      position.xPos = Math.max(
        0,
        Math.min(position.xPos, boundingDimensions.width - logoDimensions.width),
      );
      color.value = getRandomColor();
    }
    if (position.yPos + logoDimensions.height >= boundingDimensions.height || position.yPos <= 0) {
      velocity.yVel *= -1;
      position.yPos = Math.max(
        0,
        Math.min(position.yPos, boundingDimensions.height - logoDimensions.height),
      );
      color.value = getRandomColor();
    }

    const atLeftOrRight =
      position.xPos === 0 || position.xPos === boundingDimensions.width - logoDimensions.width;

    const atTopOrBottom =
      position.yPos === 0 || position.yPos === boundingDimensions.height - logoDimensions.height;

    if (atLeftOrRight && atTopOrBottom) {
      cornerHitCount.value += 1;
    }

    animationId = requestAnimationFrame(update);
  }

  onMounted(() => {
    if (!boundingBox.value || !logoBox.value) {
      return;
    }

    boundingDimensions.width = boundingBox.value.offsetWidth;
    boundingDimensions.height = boundingBox.value.offsetHeight;
    logoDimensions.width = logoBox.value.offsetWidth;
    logoDimensions.height = logoBox.value.offsetHeight;

    boundingObserver = new ResizeObserver(([entry]) => {
      const box = entry!.contentBoxSize[0]!;
      boundingDimensions.width = box.inlineSize;
      boundingDimensions.height = box.blockSize;
    });

    logoObserver = new ResizeObserver(([entry]) => {
      const box = entry!.contentBoxSize[0]!;
      logoDimensions.width = box.inlineSize;
      logoDimensions.height = box.blockSize;
    });

    boundingObserver.observe(boundingBox.value);
    logoObserver.observe(logoBox.value);

    animationId = requestAnimationFrame(update);
  });

  onBeforeUnmount(() => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }
    boundingObserver?.disconnect();
    logoObserver?.disconnect();
  });

  watch([boundingBox, logoBox], ([newBounding, newLogo], [oldBounding, oldLogo]) => {
    if (oldBounding && boundingObserver) {
      boundingObserver.unobserve(oldBounding);
    }
    if (oldLogo && logoObserver) {
      logoObserver.unobserve(oldLogo);
    }

    if (newBounding && boundingObserver) {
      boundingObserver.observe(newBounding);
    }
    if (newLogo && logoObserver) {
      logoObserver.observe(newLogo);
    }
  });

  return { position, velocity, color, cornerHitCount };
}
