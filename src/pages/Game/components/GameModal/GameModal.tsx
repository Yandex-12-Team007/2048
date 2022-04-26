import React from 'react';

import Button, {ButtonAppearance} from 'Components/Button';

import {GameState} from 'Constants/game';

import './GameModal.pcss';

export interface GameModalProps {
  status : GameState
  restart : () => void
}

// TODO: Тут будет оповещение при проигрыше / сборке 2048
// TODO: Ждем pr Модалки =)
export default function GameModal({status, restart} : GameModalProps) {
  console.log('GameModal');
  console.log(status);
  if (status === GameState.WIN) {
    return <div>
      <h1>Вы победили !</h1>
      <p>Хотите продолжить и поразить всех своим рекордом ?</p>
      <Button
        onClick={() => console.log('Продолжить')}
        text={'Продолжить'}
        appearance={ButtonAppearance.TEXT}
      />
      <Button
        onClick={restart}
        text={'Заново'}
        appearance={ButtonAppearance.TEXT}
      />
    </div>
  }

  if (status === GameState.LOSE) {
    return <div>
      <h1>Фиаско !</h1>
      <p>В следующий раз получится !</p>
      <Button
        onClick={restart}
        text={'Заново'}
        appearance={ButtonAppearance.TEXT}
      />
    </div>
  }

  return <></>
}
