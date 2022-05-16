import type { QuickAccessEntry } from '@/types/QuickAccessEntry';

import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { v4 as uuid } from 'uuid';

// These are just arbitrary default values
const defaultQuickAccessEntries: QuickAccessEntry[] = [
  {
    id: uuid(),
    name: 'YouTube',
    href: 'https://www.youtube.com'
  },
  {
    id: uuid(),
    name: 'Gmail',
    href: 'https://mail.google.com'
  },
  {
    id: uuid(),
    name: 'GitHub',
    href: 'https://github.com'
  },
  {
    id: uuid(),
    name: 'Twitter',
    href: 'https://twitter.com'
  },
  {
    id: uuid(),
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
    getQuickAccessEntries(state): QuickAccessEntry[] {
      return state.entries;
    }
  },
  actions: {
    addQuickAccessEntry(entry: QuickAccessEntry) {
      this.entries.push(entry);
    },
    removeQuickAccessEntry(entry: QuickAccessEntry) {
      this.entries = this.entries.filter(e => e.id !== entry.id);
    },
    setQuickAccessEntries(entries: QuickAccessEntry[]) {
      this.entries = entries;
    },
    updateQuickAccessEntry(entry: QuickAccessEntry) {
      this.entries = this.entries.map(e => e.id === entry.id ? entry : e);
    }
  },
});