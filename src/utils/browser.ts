export const getBrowserInstance = (): typeof chrome => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const browserInstance = window.chrome || (window as any)['browser'];
  return browserInstance;
};

export const isRunningAsExtension = !!(chrome?.extension?.getBackgroundPage);