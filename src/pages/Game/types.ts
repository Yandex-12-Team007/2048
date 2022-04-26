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

export enum Direction {
  LEFT= 'left',
  RIGHT= 'right',
  UP= 'up',
  DOWN= 'down'
}

export interface ICanMove {
  [Direction.LEFT] : boolean,
  [Direction.RIGHT] : boolean,
  [Direction.UP] : boolean,
  [Direction.DOWN] : boolean,
}

export interface IMoveParams {
  iStart : number,
  iMax : number,
  jStart : number,
  jMax : number
}
