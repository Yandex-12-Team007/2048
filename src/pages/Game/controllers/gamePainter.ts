import {
  BOARD_BORDER_RADIUS,
  BOARD_COLOR,
  BOARD_SIZE,
  CELL_GRID_COLOR,
  TILE_BACKGROUND,
} from 'Constants/game';

class GamePainter {
  private ctx!: CanvasRenderingContext2D;
  private width : number;
  private boardPadding : number
  private cellWidth : number

  constructor() {
    this.width = 500;
    this.boardPadding = this.width / (BOARD_SIZE + 1) / (BOARD_SIZE + 1);
    this.cellWidth = (this.width - (BOARD_SIZE + 1) * this.boardPadding) / BOARD_SIZE;
  }

  public setWidth(width : number) {
    this.width = width;
    this.boardPadding = this.width / (BOARD_SIZE + 1) / (BOARD_SIZE + 1);
    this.cellWidth = (this.width - (BOARD_SIZE + 1) * this.boardPadding) / BOARD_SIZE;
  }

  private calculateX(x) {
    return this.boardPadding + (this.cellWidth + this.boardPadding) * x;
  }

  private calculateY(y) {
    return this.boardPadding + (this.cellWidth + this.boardPadding) * y;
  }

  public init(ctx: CanvasRenderingContext2D, width : number) {
    this.ctx = ctx;
    this.setWidth(width);
    console.log('PAINTER INIT');
    console.log(this.width);
    console.log(this.boardPadding);
    console.log(this.cellWidth);
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

  private renderTile(x: number, y: number, value: number, coef = 1) {
    const colour = TILE_BACKGROUND[value] ?? '#000';
    this.renderRoundedSquare(
        x,
        y,
        this.cellWidth * coef,
        this.cellWidth * coef,
        colour,
    );
    this.ctx.font = '40px sans-serif';
    this.ctx.fillStyle = '#FFF';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
        value.toString(),
        x + this.cellWidth / 2,
        y + this.cellWidth / 1.5,
    );
  }

  public renderBoard() {
    this.renderRoundedSquare(0, 0, this.width, this.width, BOARD_COLOR);
  }

  public renderGrid() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const x = this.boardPadding + (this.cellWidth + this.boardPadding) * j;
        const y = this.boardPadding + (this.cellWidth + this.boardPadding) * i;

        this.renderRoundedSquare(x, y, this.cellWidth, this.cellWidth, CELL_GRID_COLOR);
      }
    }
  }

  public animatedBoardUpdate(moveList, newList) {
    const renderBoard = this.renderBoard.bind(this);
    const renderGrid = this.renderGrid.bind(this);
    const renderAnimatedTiles = this.renderAnimatedTiles.bind(this);
    const animatedNewTiles = this.animatedNewTiles.bind(this);

    moveList = moveList.map((el) => {
      return {
        oldPosition: {
          x: this.calculateX(el.oldPosition.x),
          y: this.calculateY(el.oldPosition.y),
          value: el.oldPosition.value,
        },
        newPosition: {
          x: this.calculateX(el.newPosition.x),
          y: this.calculateY(el.newPosition.y),
          value: el.newPosition.value,
        },
      }
    })

    newList = newList.map((el) => {
      {
        return {
          x: this.calculateX(el.x),
          y: this.calculateY(el.y),
          value: el.value,
        }
      }
    })

    let stepIx = 1; const count = 8;
    function step(timestamp) {
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
      this.renderTile(x, y, value, stepIx / count);
    });
  }
}

const gamePainter = new GamePainter();

export default gamePainter;
