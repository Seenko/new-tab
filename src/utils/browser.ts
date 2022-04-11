export const getBrowserInstance = (): typeof chrome => {
  const browserInstance = window.chrome || (window as any)['browser']
  return browserInstance
}

export const isRunningAsExtension: boolean = !!(chrome?.extension?.getBackgroundPage)