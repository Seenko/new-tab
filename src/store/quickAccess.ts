import type { quickAccessEntry } from '@/types/quickAccessEntry'

import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

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
  }
]

export const useQuickAccessStore = defineStore({
  id: 'quickAccess',
  state: () => ({
    entries: useStorage('quickAccess', defaultQuickAccessEntries)
  }),
  getters: {
    getQuickAccessEntries(state): quickAccessEntry[] {
      return state.entries
    }
  },
  actions: {
    addQuickAccessEntry(entry: quickAccessEntry) {
      this.entries.push(entry)
    },
    removeQuickAccessEntry(entry: quickAccessEntry) {
      this.entries = this.entries.filter(e => e !== entry)
    }
  },
})