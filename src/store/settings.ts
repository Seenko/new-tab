import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { isRunningAsExtension } from '@/utils/browser';

// Vue Use already scaffolds dark mode for us, no need to do it manually

interface Settings {
  autoQuickAccessEntries: boolean;
  showNetworkStatus: boolean;
  backgroundColor: string;
  enableCustomBackgroundImage: boolean;
  backgroundImage: string;
}

// These are just arbitrary default values
const defaultSettings: Settings = {
  autoQuickAccessEntries: true,
  showNetworkStatus: true,
  backgroundColor: '',
  enableCustomBackgroundImage: false,
  backgroundImage: ''
};

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => useStorage('settings', defaultSettings),
  getters: {
    getAutoQuickAccessEntries(): boolean {
      return isRunningAsExtension ? this.autoQuickAccessEntries : false;
    }
  },
  actions: {
    resetSettings() {
      Object.assign(this, defaultSettings);
    },
    toggleAutoQuickAccessEntries(value?: boolean): boolean {
      return (this.autoQuickAccessEntries = typeof value === 'boolean' ? value : !this.autoQuickAccessEntries);
    },
    toggleShowNetworkStatus(value?: boolean): boolean {
      return (this.showNetworkStatus = typeof value === 'boolean' ? value : !this.showNetworkStatus);
    },
    setBackgroundColor(value: string): string {
      return (this.backgroundColor = value);
    },
    toggleEnableCustomBackgroundImage(value?: boolean): boolean {
      this.setBackgroundImage('');
      return (this.enableCustomBackgroundImage = typeof value === 'boolean' ? value : !this.enableCustomBackgroundImage);
    },
    setBackgroundImage(value: string): string {
      return (this.backgroundImage = value);
    }
  },
});