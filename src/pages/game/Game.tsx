import React, { useEffect, useRef, useState } from "react";

import Layout from "Components/Layout";
import { BOARD_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH, KeyCodes } from "Constants/game";
import { createEmptyTiles, getNewTile, renderBoard, renderGrid, renderTiles } from "./utils";
import { ITile } from "./types";
import {cloneDeep} from 'lodash';

import './Game.pcss';

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);

  const [tileList, setTileList] = useState<ITile[][]>(createEmptyTiles());
  const [score, setScore] = useState(0);

  const tileListRef = useRef(tileList);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (ctx) {
      renderBoard(ctx);
      renderGrid(ctx);
      addStartTiles();
    }

    addListeners();

    return removeListeners;
  }, []);

  useEffect(() => {
    console.log('useEffect');
    updateBoard();
    updateMaxResult();
  }, [tileList]);

  function addListeners() {
    document.addEventListener('keydown', moveCells);
  }

  function removeListeners() {
    document.removeEventListener('keydown', moveCells);
  }

  function updateBoard() {
    const ctx = ref.current?.getContext('2d');
    if (ctx) {
      const fullTileList = tileList.flat().filter((tile) => tile.value !== 0);
      renderGrid(ctx);
      renderTiles(ctx, fullTileList);
    }
  }

  function updateMaxResult() {
    const tileValueList = tileList.flat().map((tile) => tile.value);
    const maxValue = Math.max(...tileValueList);
    setScore(maxValue);
  }

  function addStartTiles(){
    const newTileList = cloneDeep(tileList);

    for (let i = 0; i < 2; i++) {
      const newTile = getNewTile(newTileList);
      if (newTile) {
        const { rowIndex, columnIndex, value } = newTile;
        newTileList[rowIndex][columnIndex] = {
          ...newTileList[rowIndex][columnIndex],
          value,
        };
      }
    }

    setTileList(newTileList);
    tileListRef.current = newTileList;
  }

  function moveCells(event: KeyboardEvent) {
    switch (event.code) {
      case KeyCodes.LEFT:
        moveToLeft();
        break;
      case KeyCodes.RIGHT:
        moveToRight();
        break;
      case KeyCodes.DOWN:
        moveToDown();
        break;
      case KeyCodes.UP:
        moveToUp();
        break;
    }
  }

  function getMovedToLeftCellRow(cellRow: ITile[]) {
    const fullCellsInRow = cellRow.filter((cell) => cell.value !== 0);
    const summedFullCellsInRow: ITile[] = [];
    const resultedCellRow: ITile[] = cloneDeep(cellRow);

    for (let k = 0; k < fullCellsInRow.length; k++) {
      if (fullCellsInRow[k + 1] && fullCellsInRow[k].value === fullCellsInRow[k + 1].value) {
        summedFullCellsInRow.push({ ...fullCellsInRow[k], value: fullCellsInRow[k].value * 2 });
        fullCellsInRow[k + 1].value = 0;
      } else if (fullCellsInRow[k].value !== 0) {
        summedFullCellsInRow.push(fullCellsInRow[k]);
      }
    }

    for (let j = 0; j < BOARD_SIZE; j++) {
      resultedCellRow[j].value = summedFullCellsInRow[j]?.value || 0;
    }

    return resultedCellRow;
  }

  function moveToLeft() {
    const updatedTileList: ITile[][] = cloneDeep(tileListRef.current);
    for (let i = 0; i < BOARD_SIZE; i++) {
      updatedTileList[i] = getMovedToLeftCellRow(updatedTileList[i]);
    }

    const updatedTileListWithNewTile = getTileListWithNewTile(updatedTileList);

    setTileList(updatedTileListWithNewTile);
    tileListRef.current = updatedTileListWithNewTile;
  }

  function moveToRight() {
    const updatedTileList: ITile[][] = cloneDeep(tileListRef.current);
    for (let i = 0; i < BOARD_SIZE; i++) {
      updatedTileList[i] = getMovedToLeftCellRow(updatedTileList[i].reverse()).reverse();
    }

    const updatedTileListWithNewTile = getTileListWithNewTile(updatedTileList);

    setTileList(updatedTileListWithNewTile);
    tileListRef.current = updatedTileListWithNewTile;
  }

  function moveToUp() {
    const cloneTileList: ITile[][] = cloneDeep(tileListRef.current);
    const transposedCellList = cloneTileList[0].map((_col, i) => cloneTileList.map(row => row[i]));

    for (let i = 0; i < BOARD_SIZE; i++) {
      transposedCellList[i] = getMovedToLeftCellRow(transposedCellList[i]);
    }

    const updatedTileList = transposedCellList[0].map((_col, i) => transposedCellList.map(row => row[i]));

    const updatedTileListWithNewTile = getTileListWithNewTile(updatedTileList);

    setTileList(updatedTileListWithNewTile);
    tileListRef.current = updatedTileListWithNewTile;
  }

  function moveToDown() {
    const cloneTileList: ITile[][] = cloneDeep(tileListRef.current);
    const transposedCellList = cloneTileList[0].map((_col, i) => cloneTileList.map(row => row[i]));

    for (let i = 0; i < BOARD_SIZE; i++) {
      transposedCellList[i] = getMovedToLeftCellRow(transposedCellList[i].reverse()).reverse();
    }

    const updatedTileList = transposedCellList[0].map((_col, i) => transposedCellList.map(row => row[i]));

    const updatedTileListWithNewTile = getTileListWithNewTile(updatedTileList);

    setTileList(updatedTileListWithNewTile);
    tileListRef.current = updatedTileListWithNewTile;
  }

  function getTileListWithNewTile(tileList: ITile[][]) {
    const updatedTileList = cloneDeep(tileList);

    const newTile = getNewTile(tileList);

    if (newTile) {
      const { rowIndex, columnIndex, value } = newTile;
      updatedTileList[rowIndex][columnIndex] = {
        ...updatedTileList[rowIndex][columnIndex],
        value,
      };
    }
    return updatedTileList;
  }

  return (
    <Layout title={'Игра'}>
      <div className="game-container">
        <canvas className="game-canvas" ref={ref} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
        <div className="game-score">
          <p className="game-score__caption">Счет</p>
          <p className="game-score__score">{score}</p>
        </div>
      </div>
    </Layout>
  );
}

