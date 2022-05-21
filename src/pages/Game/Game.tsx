import React, {useEffect, useRef, useState} from 'react';

import Layout from 'Components/Layout';
import GameModal from './components/GameModal';

import {GameState} from 'Constants/game';

import gameEngine from './controllers/gameEngine';

import './Game.pcss';
import {SoundButton} from 'components/SoundButton/SoundButton';

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState(GameState.INIT);
  const [width] = useState(450);
  const [record, setRecord] = useState(0);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d') as CanvasRenderingContext2D;
    gameEngine.init(ctx, width, record, setScore, setRecord, setGameState);

    return () => {
      gameEngine.finish();
    };
  }, []);

  function gameRestart() {
    gameEngine.restart();
  }

  function gameContinue() {
    gameEngine.continue();
  }

  function setSoundState(isSoundEnabled: boolean) {
    gameEngine.setSoundState(isSoundEnabled);
  }

  return (
    <Layout title={'Игра'}>
      <div className="game-container">
        <SoundButton onStateChange={setSoundState} />
        <div className={'game-info'}>
          <div className="game-score">
            <p className="game-score__caption">Счет</p>
            <p className="game-score__score">{score}</p>
          </div>
          <div className="game-record">
            <p className="game-record__caption">Рекорд</p>
            <p className="game-record__score">{record}</p>
          </div>
        </div>
        <div className={'game-canvas__wrapper'} ref={wrapperRef}>
          <canvas
            className="game-canvas"
            ref={ref}
            width={width}
            height={width}
          />
        </div>
      </div>
      <GameModal
        status={gameState}
        gameRestart={gameRestart}
        gameContinue={gameContinue}
      />
    </Layout>
  );
}

