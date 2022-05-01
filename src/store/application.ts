import { defineStore } from 'pinia';

interface ApplicationState {
  isSettingsPanelOpen: boolean;
  isEditingWidgets: boolean;
}

const defaultApplicationState: ApplicationState = {
  isSettingsPanelOpen: false,
  isEditingWidgets: false
};

export const useApplicationStore = defineStore({
  id: 'application',
  state: () => defaultApplicationState,
  actions: {
    toggleIsSettingsPanelOpen(value?: boolean) {
      return (this.isSettingsPanelOpen = typeof value === 'boolean' ? value : !this.isSettingsPanelOpen);
    },
    toggleIsEditingWidgets(value?: boolean) {
      return (this.isEditingWidgets = typeof value === 'boolean' ? value : !this.isEditingWidgets);
    }
  },
});