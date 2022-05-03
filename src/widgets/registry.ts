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
    default: true,
    settings: [
      {
        id: 'show24HourClock',
        name: 'Show 24 Hour Clock',
        type: 'boolean',
        value: false
      },
      {
        id: 'showClockSeconds',
        name: 'Show Clock Seconds',
        type: 'boolean',
        value: false
      }
    ]
  },
  {
    id: 'QuickAccessWidget',
    name: 'Top Sites',
    default: true,
    settings: [
      {
        id: 'showTopSites',
        name: 'Automatic Top Sites',
        type: 'boolean',
        value: true
      }
    ]
  },
  {
    id: 'NewsWidget',
    name: 'Recent News',
    default: true,
    settings: [
      {
        id: 'searchTerm',
        name: 'Search Term',
        type: 'string',
        value: ''
      }
    ]
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