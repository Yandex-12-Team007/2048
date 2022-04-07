export const BOARD_SIZE = 4;
export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 500;
export const BOARD_BORDER_RADIUS = 5;
export const BOARD_PADDING = 20;

export const CELL_WIDTH = (CANVAS_WIDTH - (BOARD_SIZE + 1) * BOARD_PADDING) / BOARD_SIZE;
export const CELL_HEIGHT = (CANVAS_HEIGHT - (BOARD_SIZE + 1) * BOARD_PADDING) / BOARD_SIZE;

export const BOARD_COLOR = '#bbada0';
export const CELL_GRID_COLOR = '#CDC1B3';

export enum KeyCodes {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight'
};

export const TILE_BACKGROUND = {
  2: '#EEE4DA',
  4: '#EDE0C8',
  8: '#F2B179',
  16: '#F59563',
  32: '#F67C5F',
  64: '#F65E3B',
  128: '#EDCF72',
  256: '#EDCC61',
  512: '#EDC850',
  1024: '#F2B179',
  2048: '#EDC22E',
}
