import { createGlobalState, useStorage, useDark } from '@vueuse/core'

useDark()

export const useSettingsState = createGlobalState(
  () => useStorage('settings', {
    showGreeting: true,
    showClockSeconds: false,
    showQuickAccess: true,
    showNetworkStatus: true
  })
)