import React, {FunctionComponent, useEffect, useState} from 'react';
import soundOnIcon from 'Static/img/sound-on.svg';
import soundOffIcon from 'Static/img/sound-off.svg';

import './SoundButton.pcss';
import classNames from 'classnames';

interface ISoundButtonProps {
  onStateChange: (soundState: boolean) => void;
  className?: string;
}

export const SoundButton: FunctionComponent<ISoundButtonProps> = ({
  className,
  onStateChange,
}) => {
  const [soundState, setSoundState] = useState<'on' | 'off'>('on');

  useEffect(() => {
    const savedState = localStorage.getItem('soundState');
    const newState = !savedState || savedState === 'on' ? 'on' : 'off';
    setSoundState(newState);
  }, []);

  useEffect(() => {
    localStorage.setItem('soundState', soundState);
    onStateChange(soundState === 'on');
  }, [soundState]);

  const getImgUrl = () => {
    return soundState === 'on' ? soundOnIcon : soundOffIcon;
  }

  const handleButtonClick = () => {
    const newState = soundState === 'on' ? 'off' : 'on';
    setSoundState(newState);
  }

  return (
    <div
      className={classNames('sound-button', className)}
      onClick={handleButtonClick}
      dangerouslySetInnerHTML={{
        __html: `
        <svg>
            ${getImgUrl()}
        </svg>`,
      }}
    />
  )
}
