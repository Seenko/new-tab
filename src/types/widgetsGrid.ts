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
  id: string;
  name: string;
  default?: boolean;
}

export type WidgetsGrid = Array<Array<Array<Widget>>>