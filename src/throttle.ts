export const throttle = (func: () => void, timeFrame: number) => {
  let lastTime = 0;
  let timeout: NodeJS.Timeout | undefined;

  return (...args: unknown[]) => {
    const now = Number(new Date());
    if (now - lastTime >= timeFrame) {
      func.apply(args);
      lastTime = now;
    }

    // Run again at end of scroll event
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
      func.apply(args);
    }, timeFrame);
  };
};
