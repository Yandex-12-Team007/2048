import { BOARD_BORDER_RADIUS, BOARD_COLOR, BOARD_PADDING, BOARD_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH, CELL_GRID_COLOR } from "Constants/game";

function renderRoundedSquare(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string, value?: number) {
  ctx.beginPath();
  ctx.moveTo(x + BOARD_BORDER_RADIUS, y);
  ctx.arcTo(x + width, y, x + width, y + height, BOARD_BORDER_RADIUS);
  ctx.arcTo(x + width, y + height, x, y + height, BOARD_BORDER_RADIUS);
  ctx.arcTo(x, y + height, x, y, BOARD_BORDER_RADIUS);
  ctx.arcTo(x, y, x + width, y, BOARD_BORDER_RADIUS);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  if (value) {
    ctx.font = '55px sans-serif';
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    ctx.fillText(value.toString(), x + width / 2, y + width / 1.5);
  }
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

export function renderTile(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string, value?: number) {
  renderRoundedSquare(ctx, x, y, width, height, color, value);
}