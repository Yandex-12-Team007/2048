import React, {useEffect, useRef, useState} from 'react';

import gameEngine from './controllers/game-engine';
import Layout from 'Components/Layout';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from 'Constants/game';

import './Game.pcss';

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d') as CanvasRenderingContext2D;
    gameEngine.init(ctx, setScore);

    return () => {
      gameEngine.finish();
    };
  }, []);

  return (
    <Layout title={'Игра'}>
      <div className="game-container">
        <canvas
          className="game-canvas"
          ref={ref}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <div className="game-score">
          <p className="game-score__caption">Счет</p>
          <p className="game-score__score">{score}</p>
        </div>
      </div>
    </Layout>
  );
}

