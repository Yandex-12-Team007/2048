import {
  BOARD_BORDER_RADIUS,
  BOARD_COLOR,
  BOARD_PADDING,
  BOARD_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CELL_GRID_COLOR,
  CELL_HEIGHT,
  CELL_WIDTH,
  TILE_BACKGROUND,
} from 'Constants/game';
import {ITile} from '../types';

class GamePainter {
  private ctx!: CanvasRenderingContext2D;

  public score: number;

  constructor() {
    this.score = 0;
  }

  public init(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.renderBoard();
    this.renderGrid();
  }

  private renderRoundedSquare(
      x: number,
      y: number,
      width: number,
      height: number,
      color: string,
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + BOARD_BORDER_RADIUS, y);
    this.ctx.arcTo(x + width, y, x + width, y + height, BOARD_BORDER_RADIUS);
    this.ctx.arcTo(x + width, y + height, x, y + height, BOARD_BORDER_RADIUS);
    this.ctx.arcTo(x, y + height, x, y, BOARD_BORDER_RADIUS);
    this.ctx.arcTo(x, y, x + width, y, BOARD_BORDER_RADIUS);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  private renderTile(x: number, y: number, value: number) {
    this.renderRoundedSquare(x, y, CELL_WIDTH, CELL_HEIGHT, TILE_BACKGROUND[value]);
    this.ctx.font = '55px sans-serif';
    this.ctx.fillStyle = '#FFF';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
        value.toString(),
        x + CELL_WIDTH / 2,
        y + CELL_WIDTH / 1.5,
    );
  }

  private renderTiles(tileList: ITile[]) {
    tileList.forEach(({x, y, value}) => {
      this.renderTile(x, y, value);
    });
  }

  public renderBoard() {
    this.renderRoundedSquare(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, BOARD_COLOR);
  }

  public renderGrid() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const cellWidth = (CANVAS_WIDTH - (BOARD_SIZE + 1) * BOARD_PADDING) / BOARD_SIZE;
        const cellHeight = (CANVAS_HEIGHT - (BOARD_SIZE + 1) * BOARD_PADDING) / BOARD_SIZE;

        const x = BOARD_PADDING + (cellWidth + BOARD_PADDING) * j;
        const y = BOARD_PADDING + (cellHeight + BOARD_PADDING) * i;

        this.renderRoundedSquare(x, y, cellWidth, cellHeight, CELL_GRID_COLOR);
      }
    }
  }

  public updateBoard(tileList: ITile[]) {
    this.renderGrid();
    this.renderTiles(tileList);
  }

  public animatedBoardUpdate(moveList, newList) {
    const renderBoard = this.renderBoard.bind(this);
    const renderGrid = this.renderGrid.bind(this);
    const renderAnimatedTiles = this.renderAnimatedTiles.bind(this);
    const animatedNewTiles = this.animatedNewTiles.bind(this);

    let stepIx = 1; const count = 8;
    function step(timestamp) {
      // console.log('step');
      renderBoard();
      renderGrid();
      renderAnimatedTiles(moveList, stepIx, count);

      if (stepIx < count) {
        window.requestAnimationFrame(step);
        stepIx++;
      }

      if (stepIx === count) {
        animatedNewTiles(newList);
      }
    }

    window.requestAnimationFrame(step);
  }

  private renderAnimatedTiles(tileList, stepIx, count) {
    tileList.forEach(({oldPosition, newPosition}) => {
      this.renderAnimatedTile(oldPosition, newPosition, stepIx / count);
    });
  }

  private renderAnimatedTile(oldPosition, newPosition, coef) {
    // console.log('renderAnimatedTile');
    const xDiff = (newPosition.x - oldPosition.x) * coef;
    const yDiff = (newPosition.y - oldPosition.y) * coef;

    const x = oldPosition.x + xDiff;
    const y = oldPosition.y + yDiff;
    const value = coef !== 1 ? oldPosition.value : newPosition.value;

    this.renderTile(x, y, value);
  }

  private animatedNewTiles(newTiles) {
    const renderNewTiles = this.renderNewTiles.bind(this);

    let stepIx = 1; const count = 5;
    function step(timestamp) {
      renderNewTiles(newTiles, stepIx, count);

      if (stepIx < count) {
        window.requestAnimationFrame(step);
        stepIx++;
      }
    }

    window.requestAnimationFrame(step);
  }

  private renderNewTiles(newTiles, stepIx, count) {
    newTiles.forEach(({x, y, value}) => {
      this.renderNewTile(x, y, value, stepIx / count);
    });
  }

  private renderNewTile(x: number, y: number, value: number, coef) {
    this.renderRoundedSquareAnimate(x, y, CELL_WIDTH * coef, CELL_HEIGHT * coef, TILE_BACKGROUND[value]);
    this.ctx.font = '55px sans-serif';
    this.ctx.fillStyle = '#FFF';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
        value.toString(),
        x + CELL_WIDTH / 2,
        y + CELL_WIDTH / 1.5,
    );
  }

  private renderRoundedSquareAnimate(
      x: number,
      y: number,
      width: number,
      height: number,
      color: string,
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + BOARD_BORDER_RADIUS, y);
    this.ctx.arcTo(x + width, y, x + width, y + height, BOARD_BORDER_RADIUS);
    this.ctx.arcTo(x + width, y + height, x, y + height, BOARD_BORDER_RADIUS);
    this.ctx.arcTo(x, y + height, x, y, BOARD_BORDER_RADIUS);
    this.ctx.arcTo(x, y, x + width, y, BOARD_BORDER_RADIUS);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
}

const gamePainter = new GamePainter();

export default gamePainter;
