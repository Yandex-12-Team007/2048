import {
  BOARD_PADDING,
  BOARD_SIZE,
  CELL_HEIGHT,
  CELL_WIDTH,
  KeyCodes,
} from 'Constants/game';
import {INewTileScheme, ITile} from '../types';

import {cloneDeep} from 'lodash';
import gamePainter from './game-painter';

class GameEngine {
  private tileList: ITile[][];
  private isMoved: boolean;
  private score: number;
  private updateScoreCallback!: (score: number) => void;

  constructor() {
    this.tileList = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE));
    this.isMoved = false;
    this.score = 0;
  }

  private createEmptyTiles() {
    const cells: ITile[][] = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE));

    for (let i = 0; i < BOARD_SIZE; i++) {
      cells[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        const squareX = BOARD_PADDING + (CELL_WIDTH + BOARD_PADDING) * j;
        const squareY = BOARD_PADDING + (CELL_HEIGHT + BOARD_PADDING) * i;
        cells[i][j] = {x: squareX, y: squareY, value: 0};
      }
    }

    return cells;
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
    const fullTileList = this.tileList.flat().filter((tile) => tile.value !== 0);
    gamePainter.updateBoard(fullTileList);
  }

  private moveCells = (event: KeyboardEvent) => {
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
    const fullCellsInRow = cellRow.filter((cell) => cell.value !== 0);
    const summedFullCellsInRow: ITile[] = [];
    const resultedCellRow: ITile[] = cloneDeep(cellRow);

    for (let k = 0; k < fullCellsInRow.length; k++) {
      if (
        fullCellsInRow[k + 1] &&
        fullCellsInRow[k].value === fullCellsInRow[k + 1].value
      ) {
        summedFullCellsInRow.push({
          ...fullCellsInRow[k],
          value: fullCellsInRow[k].value * 2,
        });
        fullCellsInRow[k + 1].value = 0;
      } else if (fullCellsInRow[k].value !== 0) {
        summedFullCellsInRow.push(fullCellsInRow[k]);
      }
    }

    for (let j = 0; j < BOARD_SIZE; j++) {
      resultedCellRow[j].value = summedFullCellsInRow[j]?.value || 0;
    }

    const isChanged = resultedCellRow.some((cell, cellIndex) => {
      return cell.value !== cellRow[cellIndex].value;
    });
    if (isChanged) {
      this.isMoved = true;
    }

    return resultedCellRow;
  }

  private moveToLeft() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.tileList[i] = this.getMovedToLeftCellRow(this.tileList[i]);
    }
  }

  private moveToRight() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      const transposedRow = this.tileList[i].reverse();
      this.tileList[i] = this.getMovedToLeftCellRow(transposedRow).reverse();
    }
  }

  private moveToUp() {
    const transposedCellList = this.tileList[0].map((_col, i) => {
      return this.tileList.map((row) => row[i])
    });

    for (let i = 0; i < BOARD_SIZE; i++) {
      transposedCellList[i] = this.getMovedToLeftCellRow(transposedCellList[i]);
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
      transposedCellList[i] = this.getMovedToLeftCellRow(transposedRow).reverse();
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
      console.log('FINISH');
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
    const maxValue = Math.max(...tileValueList);

    if (maxValue > this.score) {
      this.score = maxValue;
      this.updateScoreCallback(maxValue);
    }
  }

  public init(
      ctx: CanvasRenderingContext2D,
      updateScoreCallback: (score: number) => void,
  ) {
    gamePainter.init(ctx);
    this.updateScoreCallback = updateScoreCallback;

    this.tileList = this.createEmptyTiles();
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
