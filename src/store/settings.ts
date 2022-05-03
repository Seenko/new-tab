import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

interface Settings {
  showNetworkStatus: boolean;
  backgroundColor: string;
  enableCustomBackgroundImage: boolean;
  backgroundImage: string;
}

const defaultSettings: Settings = {
  showNetworkStatus: true,
  backgroundColor: '',
  enableCustomBackgroundImage: false,
  backgroundImage: ''
};

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => useStorage('settings', defaultSettings),
  actions: {
    resetSettings() {
      Object.assign(this, defaultSettings);
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