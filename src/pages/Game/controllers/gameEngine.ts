import {
  BOARD_SIZE,
  GameState,
  KeyCodes,
} from 'Constants/game';
import {Direction, ICanMove, IMoveTile, INewTileScheme, ITile} from '../types';

import gamePainter from './gamePainter';
import {check, move} from './gameMatrixHelper';

// const TEST_FIELD : number[][] = [
//   [4, 8, 4, 0],
//   [4, 8, 4, 8],
//   [8, 4, 8, 4],
//   [4, 8, 4, 8],
// ];

/* TODO: Нормальная проверка на возможность сдвига */
class GameEngine {
  private tileList: ITile[][];
  private moveList: IMoveTile[];
  private newList: ITile[];
  private record: number;
  private gameState: GameState;
  private canMove: ICanMove;

  private updateScoreCallback!: (score: number) => void;
  private updateRecordCallback!: (score: number) => void;
  private updateGameStateCallback!: (score: number) => void;

  constructor() {
    this.gameState = GameState.INIT;
    this.tileList = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE));
    this.moveList = [];
    this.record = 0;
    this.newList = [];
    this.canMove = {
      [Direction.LEFT]: true,
      [Direction.RIGHT]: true,
      [Direction.UP]: true,
      [Direction.DOWN]: true,
    };
  }

  // private createTestFields() : ITile[][] {
  //   return this.createTileListFromMatrix(TEST_FIELD);
  // }

  private createTileListFromMatrix(matrix : number[][]) {
    const newTiles : ITile[][] = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      newTiles[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        const tile = this.createTile(i, j, matrix[i][j]);
        newTiles[i][j] = tile;
        if (tile.value !== 0) {
          this.newList.push(tile);
        }
      }
    }
    return newTiles;
  }

  private createEmptyTiles() {
    const cells: ITile[][] = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE));

    for (let i = 0; i < BOARD_SIZE; i++) {
      cells[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        cells[i][j] = this.createTile(i, j, 0);
      }
    }

    return cells;
  }

  private createTile(y, x, value) : ITile {
    return {x: x, y: y, value: value};
  }

  private addListeners() {
    document.addEventListener('keydown', this.moveCells);
  }

  private removeListeners() {
    document.removeEventListener('keydown', this.moveCells);
  }

  private updateGameState() {
    console.log(this.moveList);
    this.updatedBoard();
    this.updateMaxResult();
    this.checkMove();
    if (this.checkLose()) {
      this.setGameStatus(GameState.LOSE);
    }

    console.log(this.gameState);
  }

  private checkMove() {
    console.log('checkMove');
    this.canMove = check(this.tileList);
  }

  private checkLose() {
    for (const direction in this.canMove) {
      if (this.canMove[direction]) {
        return false;
      }
    }
    return true;
  }

  private updatedBoard() {
    console.log('updatedBoard');
    gamePainter.animatedBoardUpdate(this.moveList, this.newList);
  }

  private moveCells = (event: KeyboardEvent) => {
    // Обнуляем список сдвигов
    console.log('moveCells');
    this.moveList = [];
    this.newList = [];

    let res;

    switch (event.code) {
      case KeyCodes.LEFT:
        if (!this.canMove[Direction.LEFT]) {
          return;
        }
        res = move(this.tileList, Direction.LEFT)
        break;
      case KeyCodes.RIGHT:
        if (!this.canMove[Direction.RIGHT]) {
          return;
        }
        res = move(this.tileList, Direction.RIGHT)
        break;
      case KeyCodes.DOWN:
        if (!this.canMove[Direction.DOWN]) {
          return;
        }
        res = move(this.tileList, Direction.DOWN)
        break;
      case KeyCodes.UP:
        if (!this.canMove[Direction.UP]) {
          return;
        }
        res = move(this.tileList, Direction.UP)
        break;
    }

    const [matrix, moveList] = res;

    this.moveList = moveList;
    this.tileList = this.createTileListFromMatrix(matrix)

    this.addTile();

    this.updateGameState();
  }

  private addTile() {
    const newTile = this.getNewTile();

    if (newTile) {
      const {rowIndex, columnIndex, value} = newTile;
      this.tileList[rowIndex][columnIndex] = {
        ...this.tileList[rowIndex][columnIndex],
        value,
      };

      const tile = this.createTile(rowIndex, columnIndex, value);
      this.newList.push(tile);
    }
  }

  private addStartTiles() {
    for (let i = 0; i < 2; i++) {
      this.addTile();
    }
  }

  private findEmptyCell() {
    const cellRowIndex = Math.floor(Math.random() * BOARD_SIZE);
    const cellColumnIndex = Math.floor(Math.random() * BOARD_SIZE);
    const currentCell = this.tileList[cellRowIndex][cellColumnIndex];

    if (currentCell.value === 0) {
      return {rowIndex: cellRowIndex, columnIndex: cellColumnIndex};
    }

    return this.findEmptyCell();
  }

  private getNewTile(): INewTileScheme | undefined {
    let emptyCellCount = 0;

    this.tileList.forEach((cellRow) => {
      cellRow.forEach((cell) => {
        if (!cell.value) {
          emptyCellCount++;
        }
      })
    });

    if (emptyCellCount === 0) {
      this.finish();
      return;
    }

    const {rowIndex, columnIndex} = this.findEmptyCell();

    return {
      rowIndex,
      columnIndex,
      value: Math.random() < 0.75 ? 2 : 4,
    };
  }

  private updateMaxResult() {
    // Обновляем счет
    const tileValueList = this.tileList.flat().map((tile) => tile.value);
    const currentScore = tileValueList.reduce((acc, el) => {
      acc += el;
      return acc;
    }, 0)
    this.updateScoreCallback(currentScore);
    // Обновляем рекорд
    if (currentScore > this.record) {
      this.record = currentScore;
      this.updateRecordCallback(this.record);
    }
    // Если игра в стадии Play - проверяем на 2048
    // eslint-disable-next-line max-len
    if (this.gameState === GameState.PLAY && Math.max(...tileValueList) >= 2048) {
      // TODO: Убирать обработчики нажатий при открытой модалке
      this.setGameStatus(GameState.WIN);
    }
  }

  private setGameStatus(newStatus : GameState) {
    this.gameState = newStatus;
    this.updateGameStateCallback(newStatus);
  }

  public init(
      ctx: CanvasRenderingContext2D,
      width: number,
      record = 0,
      updateScoreCallback: (score: number) => void,
      updateRecordCallback: (score: number) => void,
      updateGameStateCallback: (score: number) => void,
  ) {
    gamePainter.init(ctx, width);
    this.updateScoreCallback = updateScoreCallback;
    this.updateRecordCallback = updateRecordCallback;
    this.updateGameStateCallback = updateGameStateCallback;
    this.record = record;

    this.tileList = this.createEmptyTiles();
    // this.tileList = this.createTestFields();
    // Добавляем ячейки
    this.addStartTiles();
    // Рисуем
    this.updateGameState();
    // Выставляем статус начала игры
    this.setGameStatus(GameState.PLAY);
    // Вешаем обработчик
    this.addListeners();
  }

  public restart() {
    this.tileList = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE));
    this.moveList = [];
    this.newList = [];

    this.tileList = this.createEmptyTiles();
    // this.tileList = this.createTestFields();
    this.addStartTiles();
    this.updateGameState();

    // Выставляем статус начала игры
    this.setGameStatus(GameState.PLAY);
  }

  public finish() {
    this.removeListeners();
  }
}

const gameEngine = new GameEngine();

export default gameEngine;
