import { defineStore } from 'pinia'

interface ApplicationState {
  isSettingsPanelOpen: boolean;
}

const defaultApplicationState: ApplicationState = {
  isSettingsPanelOpen: false
}

export const useApplicationStore = defineStore({
  id: 'application',
  state: () => defaultApplicationState,
  actions: {
    toggleIsSettingsPanelOpen(value?: boolean) {
      return (this.isSettingsPanelOpen = typeof value === 'boolean' ? value : !this.isSettingsPanelOpen)
    }
  },
})