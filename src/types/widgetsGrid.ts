export type WidgetsGrid = Array<Array<Array<Widget>>>

export interface WidgetsGridChangeActionMovedContent {
  element: Widget;
  newIndex: number;
  oldIndex: number;
}

export interface WidgetsGridChangeActionAddedContent {
  element: Widget;
  newIndex: number;
}

export interface WidgetsGridChangeActionRemovedContent {
  element: Widget;
  oldIndex: number;
}

export interface WidgetsGridChangeAction {
  moved?: WidgetsGridChangeActionMovedContent;
  added?: WidgetsGridChangeActionAddedContent;
  removed?: WidgetsGridChangeActionRemovedContent;
}

export interface WidgetsGridChange {
  row: number;
  column: number;
  action: WidgetsGridChangeAction;
}

export type WidgetSettingType = 'boolean' | 'string' | 'select';

export interface WigetSettingValue {
  id: string;
  name: string;
  value: unknown;
}

export interface WidgetSetting {
  id: string;
  name: string;
  type: WidgetSettingType;
  value: WigetSettingValue | boolean | string | number;
  values?: Array<WigetSettingValue>;
}

export interface WidgetSettingUpdate {
  row: number;
  column: number;
  index: number;
  setting: {
    id: string;
    value: unknown;
  }
}

export interface Widget {
  id: string;
  name: string;
  default?: boolean;
  settings?: Array<WidgetSetting>;
}