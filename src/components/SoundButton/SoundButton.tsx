import React, {FunctionComponent, useEffect, useState} from 'react';
import soundOnIcon from 'Static/img/sound-on.svg';
import soundOffIcon from 'Static/img/sound-off.svg';

interface ISoundButtonProps {
  onStateChange: (soundState: boolean) => void;
}

export const SoundButton: FunctionComponent<ISoundButtonProps> = ({onStateChange}) => {
  const [soundState, setSoundState] = useState<'on' | 'off'>('on');

  useEffect(() => {
    const savedState = localStorage.getItem('soundState') === 'on' ? 'on' : 'off';
    setSoundState(savedState);
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
    <img src={getImgUrl()} alt="" onClick={handleButtonClick} />
  )
}
