import { quickAccessEntry } from '@/types/quickAccessEntry'
import { createGlobalState, useStorage } from '@vueuse/core'

export const useQuickAccessState = createGlobalState(
  () => useStorage('quickAccess', [
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
  ] as quickAccessEntry[])
)