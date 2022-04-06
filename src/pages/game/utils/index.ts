import { BOARD_BORDER_RADIUS, BOARD_COLOR, BOARD_PADDING, BOARD_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH, CELL_GRID_COLOR, CELL_HEIGHT, CELL_WIDTH, TILE_BACKGROUND } from "Constants/game";
import { INewTileScheme, ITile } from "../types";

export function renderRoundedSquare(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
  ctx.beginPath();
  ctx.moveTo(x + BOARD_BORDER_RADIUS, y);
  ctx.arcTo(x + width, y, x + width, y + height, BOARD_BORDER_RADIUS);
  ctx.arcTo(x + width, y + height, x, y + height, BOARD_BORDER_RADIUS);
  ctx.arcTo(x, y + height, x, y, BOARD_BORDER_RADIUS);
  ctx.arcTo(x, y, x + width, y, BOARD_BORDER_RADIUS);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

export function renderBoard(ctx: CanvasRenderingContext2D) {
  renderRoundedSquare(ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, BOARD_COLOR);
}

export function renderGrid(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cellWidth = (CANVAS_WIDTH - (BOARD_SIZE + 1) * BOARD_PADDING) / BOARD_SIZE;
      const cellHeight = (CANVAS_HEIGHT - (BOARD_SIZE + 1) * BOARD_PADDING) / BOARD_SIZE;

      const x = BOARD_PADDING + (cellWidth + BOARD_PADDING) * j;
      const y = BOARD_PADDING + (cellHeight + BOARD_PADDING) * i;

      renderRoundedSquare(ctx, x, y, cellWidth, cellHeight, CELL_GRID_COLOR);
    }
  }
}

export function renderTile(ctx: CanvasRenderingContext2D, x: number, y: number, value: number) {
  renderRoundedSquare(ctx, x, y, CELL_WIDTH, CELL_HEIGHT, TILE_BACKGROUND[value]);
  ctx.font = "55px sans-serif";
  ctx.fillStyle = '#FFF';
  ctx.textAlign = "center";
  ctx.fillText(value.toString(), x + CELL_WIDTH / 2, y + CELL_WIDTH / 1.5);
}

export function renderTiles(ctx: CanvasRenderingContext2D, tileList: ITile[]) {
  tileList.forEach(({ x, y, value }) => {
    renderTile(ctx, x, y, value);
  });
}

function findEmptyCell(cellList: ITile[][]) {
  const cellRowIndex = Math.floor(Math.random() * BOARD_SIZE);
  const cellColumnIndex = Math.floor(Math.random() * BOARD_SIZE);
  const currentCell = cellList[cellRowIndex][cellColumnIndex];

  if (currentCell.value === 0) {
    return { rowIndex: cellRowIndex, columnIndex: cellColumnIndex };
  }

  return findEmptyCell(cellList);
}

export function getNewTile(cellList: ITile[][]): INewTileScheme | undefined {
  let emptyCellCount = 0;

  cellList.forEach((cellRow) => {
    cellRow.forEach((cell) => {
      if (!cell.value) {
        emptyCellCount++;
      }
    })
  });

  if (emptyCellCount === 0) {
    console.log('FINISH');
    return;
  }

  const { rowIndex, columnIndex } = findEmptyCell(cellList);
  
  return {
    rowIndex,
    columnIndex,
    value: Math.random() < 0.75 ? 2 : 4,
  };
}

export function createEmptyTiles() {
  const cells: ITile[][] = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE));

  for (let i = 0; i < BOARD_SIZE; i++) {
    cells[i] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      const squareX = BOARD_PADDING + (CELL_WIDTH + BOARD_PADDING) * j;
      const squareY = BOARD_PADDING + (CELL_HEIGHT + BOARD_PADDING) * i;
      cells[i][j] = { x: squareX, y: squareY, value: 0 };
    }
  }

  return cells;
}