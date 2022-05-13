import type { quickAccessEntry } from '@/types/quickAccessEntry';

import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

// These are just arbitrary default values
const defaultQuickAccessEntries: quickAccessEntry[] = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com'
  },
  {
    name: 'Gmail',
    href: 'https://mail.google.com'
  },
  {
    name: 'GitHub',
    href: 'https://github.com'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com'
  },
  {
    name: 'Reddit',
    href: 'https://reddit.com'
  }
];

export const useQuickAccessStore = (instanceName: string) => defineStore({
  id: `quickAccess-${instanceName}`,
  state: () => ({
    entries: useStorage(`quickAccess-${instanceName}`, defaultQuickAccessEntries)
  }),
  getters: {
    getQuickAccessEntries(state): quickAccessEntry[] {
      return state.entries;
    }
  },
  actions: {
    addQuickAccessEntry(entry: quickAccessEntry) {
      this.entries.push(entry);
    },
    removeQuickAccessEntry(entry: quickAccessEntry) {
      this.entries = this.entries.filter(e => e !== entry);
    }
  },
});