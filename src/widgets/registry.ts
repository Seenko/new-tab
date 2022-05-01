import type { Widget } from '@/types/widgetsGrid';
import type { Component } from 'vue';

import GreetingWidget from '@/widgets/GreetingWidget.vue';
import ClockWidget from '@/widgets/ClockWidget.vue';
import QuickAccessWidget from '@/widgets/QuickAccessWidget.vue';
import NewsWidget from '@/widgets/NewsWidget.vue';
import WeatherWidget from '@/widgets/WeatherWidget.vue';
import ConnectionStatusWidget from '@/widgets/ConnectionStatusWidget.vue';

export const widgetsComponents: { [name: string]: Component } = {
  GreetingWidget,
  ClockWidget,
  QuickAccessWidget,
  NewsWidget,
  WeatherWidget,
  ConnectionStatusWidget
};

export const registeredWidgets: Array<Widget> = [
  {
    id: 'GreetingWidget',
    name: 'Greeting',
    default: true
  },
  {
    id: 'ClockWidget',
    name: 'Clock',
    default: true
  },
  {
    id: 'QuickAccessWidget',
    name: 'Top Sites',
    default: true
  },
  {
    id: 'NewsWidget',
    name: 'Recent News',
    default: true
  },
  {
    id: 'WeatherWidget',
    name: 'Weather',
    default: true
  },
  {
    id: 'ConnectionStatusWidget',
    name: 'Connection Status'
  }
];

export const defaultWidgets = registeredWidgets.filter(widget => widget.default);