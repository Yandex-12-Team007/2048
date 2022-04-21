import {
  BOARD_PADDING,
  BOARD_SIZE,
  CELL_HEIGHT,
  CELL_WIDTH,
  KeyCodes,
} from 'Constants/game';
import {INewTileScheme, ITile, IMoveTile} from '../types';

import {cloneDeep} from 'lodash';
import gamePainter from './gamePainter';
/*
const TEST_FIELD = [
  [0, 0, 0, 2],
  [0, 0, 0, 2],
  [0, 0, 0, 2],
  [0, 0, 0, 2],
];
 */

/* TODO: Нормальная проверка на возможность сдвига */
/* TODO: Сообщать о пройгрыше */
/* TODO: Сообщать о победе / предложить продолжить игру */
class GameEngine {
  private tileList: ITile[][];
  private moveList: IMoveTile[];
  private newList: ITile[];
  private isMoved: boolean;
  private updateScoreCallback!: (score: number) => void;

  constructor() {
    this.tileList = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE));
    this.moveList = [];
    this.newList = [];
    this.isMoved = false;
  }

  // private createTestFields() {
  //   const cells = TEST_FIELD;
  //
  //   for (let i = 0; i < BOARD_SIZE; i++) {
  //     for (let j = 0; j < BOARD_SIZE; j++) {
  //       console.log(cells[i][j]);
  //       // @ts-ignore
  //       cells[i][j] = this.createTile(i, j, cells[i][j]);
  //     }
  //   }
  //   console.log(cells);
  //   return cells;
  // }

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

  private createTile(y, x, value) {
    const squareX = BOARD_PADDING + (CELL_WIDTH + BOARD_PADDING) * x;
    const squareY = BOARD_PADDING + (CELL_HEIGHT + BOARD_PADDING) * y;
    return {x: squareX, y: squareY, value: value};
  }

  private addListeners() {
    document.addEventListener('keydown', this.moveCells);
  }

  private removeListeners() {
    document.removeEventListener('keydown', this.moveCells);
  }

  private updateGameState() {
    this.updatedBoard();
    this.updateMaxResult();
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
    switch (event.code) {
      case KeyCodes.LEFT:
        this.moveToLeft();
        break;
      case KeyCodes.RIGHT:
        this.moveToRight();
        break;
      case KeyCodes.DOWN:
        this.moveToDown();
        break;
      case KeyCodes.UP:
        this.moveToUp();
        break;
    }

    if (this.isMoved) {
      this.addTile();
      this.isMoved = false;
    }
    this.updateGameState();
  }

  private getMovedToLeftCellRow(cellRow: ITile[]) {
    console.log('getMovedToLeftCellRow');
    const fullCellsInRow = cellRow.filter((cell) => cell.value !== 0);
    const summedFullCellsInRow: ITile[] = [];
    const resultedCellRow: ITile[] = cloneDeep(cellRow);

    const moveList = fullCellsInRow.map(el => {
      return {
        oldPosition : el,
        newPosition : null
      }
    });

    for (let k = 0; k < fullCellsInRow.length; k++) {
      /* Если значение следующего не нулевого элемента в ряду
      *  равно значению текущего элемента  */
      if (
        fullCellsInRow[k + 1] &&
        fullCellsInRow[k].value === fullCellsInRow[k + 1].value
      ) {
        let newVal = fullCellsInRow[k].value * 2;

        summedFullCellsInRow.push({
          ...fullCellsInRow[k],
          value: newVal,
        });

        moveList[k + 1].oldPosition = {
          x : fullCellsInRow[k + 1].x,
          y : fullCellsInRow[k + 1].y,
          value : fullCellsInRow[k + 1].value,
        }

        fullCellsInRow[k + 1].value = 0;
      } else if (fullCellsInRow[k].value !== 0) {
        /* Если элемент не с чем сложить - просто заливаем его сюда )' */
        summedFullCellsInRow.push(fullCellsInRow[k]);
      }
    }
    /* Заполняем массив выходных данных */
    for (let j = 0; j < BOARD_SIZE; j++) {
      resultedCellRow[j].value = summedFullCellsInRow[j]?.value || 0;

      let move = moveList[j];
      if(move && !move.newPosition && move.oldPosition.value !== 0) {
        let k = j
        while(resultedCellRow[k].value === 0){
          k--;
        }
        // @ts-ignore
        move.newPosition = {
          x : resultedCellRow[k].x,
          y : resultedCellRow[k].y,
          value :resultedCellRow[k].value
        };
      }

      if(move && !move.newPosition && resultedCellRow[j].value !== 0) {

      }
    }
    // TODO: Сделать пред проверку а не пост проверку ....
    const isChanged = resultedCellRow.some((cell, cellIndex) => {
      return cell.value !== cellRow[cellIndex].value;
    });
    if (isChanged) {
      this.isMoved = true;
    }

    return {
      tileList : resultedCellRow,
      moveList : moveList
    };
  }

  private moveToLeft() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      const {tileList, moveList} = this.getMovedToLeftCellRow(this.tileList[i]);
      this.moveList = this.moveList.concat(moveList);
      this.tileList[i] = tileList;
    }
  }

  private moveToRight() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      const transposedRow = this.tileList[i].reverse();
      const {tileList, moveList} = this.getMovedToLeftCellRow(transposedRow);
      this.moveList = this.moveList.concat(moveList);
      this.tileList[i] = tileList.reverse();
    }
  }

  private moveToUp() {
    const transposedCellList = this.tileList[0].map((_col, i) => {
      return this.tileList.map((row) => row[i])
    });

    for (let i = 0; i < BOARD_SIZE; i++) {
      const {tileList, moveList} = this.getMovedToLeftCellRow(transposedCellList[i]);
      this.moveList = this.moveList.concat(moveList);
      transposedCellList[i] = tileList;
    }

    this.tileList = transposedCellList[0].map((_col, i) => {
      return transposedCellList.map((row) => row[i]);
    });
  }

  private moveToDown() {
    const transposedCellList = this.tileList[0].map((_col, i) => {
      return this.tileList.map((row) => row[i]);
    });

    for (let i = 0; i < BOARD_SIZE; i++) {
      const transposedRow = transposedCellList[i].reverse();
      const {tileList, moveList} = this.getMovedToLeftCellRow(transposedRow);
      this.moveList = this.moveList.concat(moveList);
      transposedCellList[i] = tileList.reverse();
    }

    this.tileList = transposedCellList[0].map((_col, i) => {
      return transposedCellList.map((row) => row[i]);
    });
  }

  private addTile() {
    const newTile = this.getNewTile();

    if (newTile) {
      const {rowIndex, columnIndex, value} = newTile;
      this.tileList[rowIndex][columnIndex] = {
        ...this.tileList[rowIndex][columnIndex],
        value,
      };

      let tile = this.createTile(rowIndex, columnIndex, value);
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
    const tileValueList = this.tileList.flat().map((tile) => tile.value);
    let currentScore = tileValueList.reduce((acc, el) => {
      acc += el;
      return acc;
    }, 0)

    this.updateScoreCallback(currentScore);
  }

  public init(
      ctx: CanvasRenderingContext2D,
      updateScoreCallback: (score: number) => void,
  ) {
    gamePainter.init(ctx);
    this.updateScoreCallback = updateScoreCallback;

    this.tileList = this.createEmptyTiles();
    //this.tileList = this.createTestFields();
    this.addStartTiles();
    this.updateGameState();

    this.addListeners();
  }

  public finish() {
    this.removeListeners();
  }
}

const gameEngine = new GameEngine();

export default gameEngine;
