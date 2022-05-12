import type { Widget } from '@/types/widgetsGrid';
import type { Component } from 'vue';

import { timezones } from '@/utils/time';
import { SHA256 } from 'crypto-js';
import { v4 as uuid } from 'uuid';

import GreetingWidget from '@/widgets/GreetingWidget.vue';
import ClockWidget from '@/widgets/ClockWidget.vue';
import QuickAccessWidget from '@/widgets/QuickAccessWidget.vue';
import NewsWidget from '@/widgets/NewsWidget.vue';
import WeatherWidget from '@/widgets/WeatherWidget.vue';
import ConnectionStatusWidget from '@/widgets/ConnectionStatusWidget.vue';
import TextWidget from '@/widgets/TextWidget.vue';
import ImageWidget from '@/widgets/ImageWidget.vue';

export const widgetsComponents: { [name: string]: Component } = {
  GreetingWidget,
  ClockWidget,
  QuickAccessWidget,
  NewsWidget,
  WeatherWidget,
  ConnectionStatusWidget,
  TextWidget,
  ImageWidget
};

export const registeredWidgets: Array<Widget> = [
  {
    type: 'GreetingWidget',
    name: 'Greeting',
    default: true
  },
  {
    type: 'ClockWidget',
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
      },
      {
        id: 'timezone',
        name: 'Timezone',
        type: 'select',
        value: 0,
        values: [
          { id: 'autodetect', name: 'Detect Automatically', value: '' },
          ...timezones.map(tz => ({ id: tz.value, name: tz.label, value: tz.value }))
        ]
      }
    ]
  },
  {
    type: 'QuickAccessWidget',
    name: 'Top Sites',
    default: true,
    settings: [
      {
        id: 'showTopSites',
        name: 'Automatic Top Sites',
        type: 'boolean',
        value: true
      },
      {
        id: 'iconsOnly',
        name: 'Show Icons Only',
        type: 'boolean',
        value: false
      }
    ]
  },
  {
    type: 'NewsWidget',
    name: 'Recent News',
    default: true,
    settings: [
      {
        id: 'searchTerm',
        name: 'Search Term',
        type: 'string',
        value: '',
        placeholder: 'electric vehicles, -tesla'
      }
    ]
  },
  {
    type: 'WeatherWidget',
    name: 'Weather',
    default: true,
    settings: [
      {
        id: 'showCurrentWeather',
        name: 'Current Weather',
        type: 'boolean',
        value: true
      },
      {
        id: 'showWeekForecast',
        name: 'Week Forecast',
        type: 'boolean',
        value: true
      },
      {
        id: 'temperatureUnit',
        name: 'Temperature Unit',
        type: 'select',
        value: 0,
        values: [
          { id: 'celsius', name: 'Celsius', value: 'celsius' },
          { id: 'fahrenheit', name: 'Fahrenheit', value: 'fahrenheit' },
          { id: 'kelvin', name: 'Kelvin', value: 'kelvin' }
        ]
      },
      {
        id: 'showLastUpdated',
        name: 'Show "Last Updated" Message',
        type: 'boolean',
        value: true
      },
    ]
  },
  {
    type: 'ConnectionStatusWidget',
    name: 'Connection Status'
  },
  {
    type: 'TextWidget',
    name: 'Custom Text',
    settings: [
      {
        id: 'tag',
        name: 'Size',
        type: 'select',
        value: 0,
        values: [
          { id: 'h1', name: 'Heading 1', value: 'h1' },
          { id: 'h2', name: 'Heading 2', value: 'h2' },
          { id: 'h3', name: 'Heading 3', value: 'h3' },
          { id: 'h4', name: 'Heading 4', value: 'h4' },
          { id: 'h5', name: 'Heading 5', value: 'h5' },
          { id: 'h6', name: 'Heading 6', value: 'h6' },
          { id: 'p', name: 'Paragraph', value: 'p' },
          { id: 'small', name: 'Small', value: 'small' }
        ]
      },
      {
        id: 'textStyle',
        name: 'Font Style',
        type: 'select',
        value: 0,
        values: [
          { id: 'sans', name: 'Sans-Serif', value: 'sans' },
          { id: 'serif', name: 'Serif', value: 'serif' },
          { id: 'mono', name: 'Monospace', value: 'mono' }
        ]
      },
      {
        id: 'textString',
        name: 'Text',
        type: 'string',
        value: 'Sample Text',
        placeholder: 'Sample Text'
      }
    ]
  },
  {
    type: 'ImageWidget',
    name: 'Custom Image',
    settings: [
      {
        id: 'src',
        name: 'Image URL',
        type: 'string',
        value: '/assets/sample.jpg',
        placeholder: '/assets/sample.jpg'
      }
    ]
  }
].map(widget => ({ ...widget, signature: SHA256(JSON.stringify(widget)).toString() }) as Widget);

export const defaultWidgets = registeredWidgets.filter(widget => widget.default).map(widget => ({ ...widget, id: uuid() }) as Widget);