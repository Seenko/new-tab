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

export interface WidgetsGridChange {
  row: number;
  column: number;
  action: WidgetsGridChangeMoved | WidgetsGridChangeAdded | WidgetsGridChangeRemoved;
}

export interface Widget {
  name: string;
}