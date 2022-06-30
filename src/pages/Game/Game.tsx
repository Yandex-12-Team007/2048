import React, {useEffect, useRef, useState} from 'react';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {useDispatch, useSelector} from 'react-redux';

import Layout from 'Components/Layout';
import {SoundButton} from 'Components/SoundButton/SoundButton';
import GameModal from './components/GameModal';

import gameEngine from './controllers/gameEngine';

import {useWindowSize} from 'hooks/useWindowSize';

import {leaderboardSelector, userSelector} from 'Store/selectors';
import {setScoreByUser, updateScore} from 'Store/actionCreators/leaderboard';

import {IRootState} from 'Interface/IRootState';

import {GameState} from 'Constants/game';

import './Game.pcss';

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const size = useWindowSize();

  const windowWidth = size.width ?? 500;
  const windowHeight = size.height ?? 500;

  const user = useSelector(userSelector)
  const leaderboard = useSelector(leaderboardSelector)
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState(GameState.INIT);
  const [width, setWidth] = useState(Math.min(windowWidth, windowHeight));

  useEffect(() => {
    console.log('Size effect');
    console.log(`width : ${width} | windowWidth : ${windowWidth} | windowHeight : ${windowHeight}`);
    if (width > windowWidth || width > windowHeight) {
      const min = Math.min(windowWidth, windowHeight);
      setWidth(min);
      gameEngine.resize(min);
    }
  }, [size])

  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();
  // Берем рекорд из хранилища
  let record = leaderboard.score;
  // Если счет больше - фиксим баг с последним обновлением
  if (score > record && user !== null) {
    record = score;
    dispatch(updateScore({
      score: score,
      user: user,
    }));
  }

  useEffect(() => {
    const ctx = ref.current?.getContext('2d') as CanvasRenderingContext2D;
    gameEngine.init(ctx, width, setScore, setGameState);

    return () => {
      gameEngine.finish();
    };
  }, []);

  // Есть смысл запрашивать рекорд только при не null пользователе
  useEffect(() => {
    dispatch(setScoreByUser(user));
  }, [user]);

  function gameRestart() {
    gameEngine.restart();
  }

  function gameContinue() {
    gameEngine.continue();
  }

  function setSoundState(isSoundEnabled: boolean) {
    gameEngine.setSoundState(isSoundEnabled);
  }

  console.log(width);

  return (
    <Layout title={'Игра'}>
      <div className="game-container">
        <SoundButton
          className="game-container__sound-button"
          onStateChange={setSoundState}
        />
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

