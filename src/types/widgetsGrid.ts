export type WidgetsGrid = Array<Array<Array<Widget>>>

export interface WidgetsGridChangeActionMovedContent {
  element: any;
  newIndex: number;
  oldIndex: number;
}

export interface WidgetsGridChangeActionAddedContent {
  element: any;
  newIndex: number;
}

export interface WidgetsGridChangeActionRemovedContent {
  element: any;
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

export interface Widget {
  id: string;
  name: string;
  default?: boolean;
}