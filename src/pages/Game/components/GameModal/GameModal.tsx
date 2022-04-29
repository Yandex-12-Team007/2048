import React from 'react';
import classNames from 'classnames';

import DefaultModal from 'Components/Modal/DefaultModal';
import Button, {ButtonAppearance} from 'Components/Button';

import {GameState} from 'Constants/game';

import './GameModal.pcss';

const LOSE_CONTENT = 'В следующий раз точно получится !';
const WIN_CONTENT = 'УРА ПОБЕДА ! Если хотите поразить всех своим рекордом' +
  'нажмите продолжить и собирайте кубики дальше !'

export interface GameModalProps {
  status : GameState
  gameRestart : () => void
  gameContinue : () => void
}

export default function GameModal({
  status,
  gameRestart,
  gameContinue,
} : GameModalProps) {
  const isLose = status === GameState.LOSE;
  const isOpen = status === GameState.LOSE || status === GameState.WIN;

  const TITLE = isLose ? 'Вы проиграли !' : 'Победа !';
  const CONTENT = isLose ? LOSE_CONTENT : WIN_CONTENT
  const actionClass = classNames({
    'game-modal__action-wrapper': true,
    'game-modal__action-wrapper_lose': isLose,
  })

  // Закрываться будем изменением статуса игры
  return <DefaultModal isOpen={isOpen} close={() => {}}>
    <div className={'game-modal__wrapper'}>
      <div className={'game-modal__title-wrapper'}>
        <h2 className={'game-modal__title'}>{TITLE}</h2>
      </div>
      <div className={'game-modal__content-wrapper'}>
        <p className={'game-modal__content'}>{CONTENT}</p>
      </div>
      <div className={actionClass}>
        <Button
          onClick={gameRestart}
          text={'Заново'}
          appearance={ButtonAppearance.SUBMIT}
        />
        {status === GameState.WIN ? <Button
          onClick={gameContinue}
          text={'Продолжить'}
          appearance={ButtonAppearance.SUBMIT}
        /> : null}
      </div>
    </div>
  </DefaultModal>
}
