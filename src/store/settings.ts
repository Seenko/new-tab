import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { isRunningAsExtension } from '@/utils/browser'
import { moveToArrayIndex } from '@/utils/array'
import { Widget, WidgetsGridChange, WidgetsGridChangeAdded, WidgetsGridChangeMoved, WidgetsGridChangeRemoved } from '@/types/widgetsGrid'

// Vue Use already scaffolds dark mode for us, no need to do it manually

interface Settings {
  showGreeting: boolean;
  showClock: boolean;
  showClockSeconds: boolean;
  show24HourClock: boolean;
  showQuickAccess: boolean;
  autoQuickAccessEntries: boolean;
  showNewsArticles: boolean;
  newsSearchTerm: string;
  newsApiKey: string;
  showWeather: boolean;
  weatherApiKey: string;
  showNetworkStatus: boolean;
  backgroundColor: string;
  backgroundImage: string;
  widgets: Array<Array<Array<Widget>>>;
}

// These are just arbitrary default values
const defaultSettings: Settings = {
  showGreeting: true,
  showClock: true,
  showClockSeconds: false,
  show24HourClock: false,
  showQuickAccess: true,
  autoQuickAccessEntries: true,
  showNewsArticles: true,
  newsSearchTerm: '',
  newsApiKey: '',
  showWeather: true,
  weatherApiKey: '',
  showNetworkStatus: true,
  backgroundColor: '',
  backgroundImage: '',
  widgets: [
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[{
      name: 'GreetingWidget'
    },
    {
      name: 'ClockWidget'
    },
    {
      name: 'QuickAccessWidget'
    },
    {
      name: 'NewsWidget'
    },
    {
      name: 'WeatherWidget'
    }],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]]
  ]
}

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => useStorage('settings', defaultSettings),
  getters: {
    getAutoQuickAccessEntries(): boolean {
      return isRunningAsExtension ? this.autoQuickAccessEntries : false
    },
    getShowNewsArticles(): boolean {
      return this.newsApiKey ? this.showNewsArticles : false
    },
    getShowWeather(): boolean {
      return this.weatherApiKey ? this.showWeather : false
    }
  },
  actions: {
    resetSettings() {
      Object.assign(this, defaultSettings)
    },
    toggleShowGreeting(value?: boolean): boolean {
      return (this.showGreeting = typeof value === 'boolean' ? value : !this.showGreeting)
    },
    toggleShowClock(value?: boolean): boolean {
      return (this.showClock = typeof value === 'boolean' ? value : !this.showClock)
    },
    toggleShowClockSeconds(value?: boolean): boolean {
      return (this.showClockSeconds = typeof value === 'boolean' ? value : !this.showClockSeconds)
    },
    toggleShow24HourClock(value?: boolean): boolean {
      return (this.show24HourClock = typeof value === 'boolean' ? value : !this.show24HourClock)
    },
    toggleShowQuickAccess(value?: boolean): boolean {
      return (this.showQuickAccess = typeof value === 'boolean' ? value : !this.showQuickAccess)
    },
    toggleAutoQuickAccessEntries(value?: boolean): boolean {
      return (this.autoQuickAccessEntries = typeof value === 'boolean' ? value : !this.autoQuickAccessEntries)
    },
    toggleShowNewsArticles(value?: boolean): boolean {
      return (this.showNewsArticles = typeof value === 'boolean' ? value : !this.showNewsArticles)
    },
    setNewsSearchTerm(value: string): string {
      return (this.newsSearchTerm = value)
    },
    setNewsApiKey(value: string): string {
      return (this.newsApiKey = value)
    },
    toggleShowWeather(value?: boolean): boolean {
      return (this.showWeather = typeof value === 'boolean' ? value : !this.showWeather)
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
    },
    updateWidgetsPosition(change: WidgetsGridChange): Array<Array<Array<Widget>>> {
      switch (Object.keys(change.action)[0]) {
        case 'moved':
          const movedAction = (change.action as WidgetsGridChangeMoved).moved
          moveToArrayIndex(this.widgets[change.row][change.column], movedAction.oldIndex, movedAction.newIndex)
          break;
        case 'added':
          const addedAction = (change.action as WidgetsGridChangeAdded).added
          this.widgets[change.row][change.column].splice(addedAction.newIndex, 0, addedAction.element);
          break;
        case 'removed':
          const removedAction = (change.action as WidgetsGridChangeRemoved).removed
          this.widgets[change.row][change.column].splice(removedAction.oldIndex, 1);
          break;
      }

      return this.widgets
    }
  },
})