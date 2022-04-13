import { defineStore } from 'pinia'
import { useStorage, useDark } from '@vueuse/core'
import { isRunningAsExtension } from '@/utils/browser'

// Vue Use already scaffolds dark mode for us, no need to do it manually
useDark()

interface Settings {
  showGreeting: boolean;
  showClockSeconds: boolean;
  show24HourClock: boolean;
  showQuickAccess: boolean;
  autoQuickAccessEntries: boolean;
  showNetworkStatus: boolean;
  backgroundColor: string;
  backgroundImage: string;
}

// These are just arbitrary default values
const defaultSettings: Settings = {
  showGreeting: true,
  showClockSeconds: false,
  show24HourClock: false,
  showQuickAccess: true,
  autoQuickAccessEntries: true,
  showNetworkStatus: true,
  backgroundColor: '',
  backgroundImage: '',
}

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    settings: useStorage('settings', defaultSettings)
  }),
  getters: {
    getShowGreeting(state): boolean {
      return state.settings.showGreeting
    },
    getShowClockSeconds(): boolean {
      return this.settings.showClockSeconds
    },
    getShow24HourClock(): boolean {
      return this.settings.show24HourClock
    },
    getShowQuickAccess(): boolean {
      return this.settings.showQuickAccess
    },
    getAutoQuickAccessEntries(): boolean {
      return isRunningAsExtension ? this.settings.autoQuickAccessEntries : false
    },
    getShowNetworkStatus(): boolean {
      return this.settings.showNetworkStatus
    },
    getBackgroundColor(): string {
      return this.settings.backgroundColor
    },
    getBackgroundImage(): string {
      return this.settings.backgroundImage
    }
  },
  actions: {
    resetSettings() {
      this.settings = Object.assign({}, defaultSettings)
    },
    toggleShowGreeting(value?: boolean): boolean {
      return (this.settings.showGreeting = typeof value === 'boolean' ? value : !this.settings.showGreeting)
    },
    toggleShowClockSeconds(value?: boolean): boolean {
      return (this.settings.showClockSeconds = typeof value === 'boolean' ? value : !this.settings.showClockSeconds)
    },
    toggleShow24HourClock(value?: boolean): boolean {
      return (this.settings.show24HourClock = typeof value === 'boolean' ? value : !this.settings.show24HourClock)
    },
    toggleShowQuickAccess(value?: boolean): boolean {
      return (this.settings.showQuickAccess = typeof value === 'boolean' ? value : !this.settings.showQuickAccess)
    },
    toggleAutoQuickAccessEntries(value?: boolean): boolean {
      return (this.settings.autoQuickAccessEntries = typeof value === 'boolean' ? value : !this.settings.autoQuickAccessEntries)
    },
    toggleShowNetworkStatus(value?: boolean): boolean {
      return (this.settings.showNetworkStatus = typeof value === 'boolean' ? value : !this.settings.showNetworkStatus)
    },
    setBackgroundColor(value: string): string {
      return (this.settings.backgroundColor = value)
    },
    setBackgroundImage(value: string): string {
      return (this.settings.backgroundImage = value)
    }
  },
})