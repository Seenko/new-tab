export interface WidgetsGridChangeMoved {
  moved: {
    element: any;
    newIndex: number;
    oldIndex: number;
  }
}

export interface WidgetsGridChangeAdded {
  added: {
    element: any;
    newIndex: number;
  }
}

export interface WidgetsGridChangeRemoved {
  removed: {
    element: any;
    oldIndex: number;
  }
}

export type WidgetsGridChangeAction = WidgetsGridChangeMoved | WidgetsGridChangeAdded | WidgetsGridChangeRemoved;

export interface WidgetsGridChange {
  row: number;
  column: number;
  action: WidgetsGridChangeMoved | WidgetsGridChangeAdded | WidgetsGridChangeRemoved;
}

export interface Widget {
  name: string;
}

export interface WidgetsGridAddNewCell {
  row: number;
  column: number | null;
  direction: -1 | 1;
}

export interface WidgetsGridRemoveCell {
  row: number;
  column: number | null;
}