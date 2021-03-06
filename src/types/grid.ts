export type GridArray = Array<Array<unknown>>

export interface GridAdd {
  row: number;
  column: number | null;
  direction: -1 | 1;
}

export interface GridRemove {
  row: number;
  column: number | null;
}