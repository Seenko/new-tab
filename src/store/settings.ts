import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { isRunningAsExtension } from '@/utils/browser'

// Vue Use already scaffolds dark mode for us, no need to do it manually

interface Settings {
  showClockSeconds: boolean;
  show24HourClock: boolean;
  autoQuickAccessEntries: boolean;
  newsSearchTerm: string;
  newsApiKey: string;
  weatherApiKey: string;
  showNetworkStatus: boolean;
  backgroundColor: string;
  backgroundImage: string;
}

// These are just arbitrary default values
const defaultSettings: Settings = {
  showClockSeconds: false,
  show24HourClock: false,
  autoQuickAccessEntries: true,
  newsSearchTerm: '',
  newsApiKey: '',
  weatherApiKey: '',
  showNetworkStatus: true,
  backgroundColor: '',
  backgroundImage: ''
}

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => useStorage('settings', defaultSettings),
  getters: {
    getAutoQuickAccessEntries(): boolean {
      return isRunningAsExtension ? this.autoQuickAccessEntries : false
    },
    getShowNewsArticles(): boolean {
      return this.newsApiKey ? true : false
    },
    getShowWeather(): boolean {
      return this.weatherApiKey ? true : false
    }
  },
  actions: {
    resetSettings() {
      Object.assign(this, defaultSettings)
    },
    toggleShowClockSeconds(value?: boolean): boolean {
      return (this.showClockSeconds = typeof value === 'boolean' ? value : !this.showClockSeconds)
    },
    toggleShow24HourClock(value?: boolean): boolean {
      return (this.show24HourClock = typeof value === 'boolean' ? value : !this.show24HourClock)
    },
    toggleAutoQuickAccessEntries(value?: boolean): boolean {
      return (this.autoQuickAccessEntries = typeof value === 'boolean' ? value : !this.autoQuickAccessEntries)
    },
    setNewsSearchTerm(value: string): string {
      return (this.newsSearchTerm = value)
    },
    setNewsApiKey(value: string): string {
      return (this.newsApiKey = value)
    },
    setWeatherApiKey(value: string): string {
      return (this.weatherApiKey = value)
    },
    toggleShowNetworkStatus(value?: boolean): boolean {
      return (this.showNetworkStatus = typeof value === 'boolean' ? value : !this.showNetworkStatus)
    },
    setBackgroundColor(value: string): string {
      return (this.backgroundColor = value)
    },
    setBackgroundImage(value: string): string {
      return (this.backgroundImage = value)
    }
  },
})