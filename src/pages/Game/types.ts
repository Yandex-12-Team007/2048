export interface ITile {
  x: number;
  y: number;
  value: number;
}

export interface IMoveTile {
  oldPosition : ITile
  newPosition : ITile | null
}

export interface INewTileScheme {
  rowIndex: number;
  columnIndex: number;
  value: number;
}
