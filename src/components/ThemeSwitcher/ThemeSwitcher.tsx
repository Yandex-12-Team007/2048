import classNames from 'classnames';
import React, {FunctionComponent} from 'react';
import './ThemeSwitcher.pcss';

interface IThemeSwitcherProps {
  state: 'on' | 'off',
  onChange: (state: 'on' | 'off') => void;
  className?: string;
}

export const ThemeSwitcher: FunctionComponent<IThemeSwitcherProps> = ({
  className,
  state,
  onChange,
}) => {
  const handleSwitchStateChange = (event) => {
    const {target: {value}} = event;
    onChange(value === 'on' ? 'off' : 'on');
  }

  return (
    <div className={classNames('theme-switcher', {['theme-switcher--dark']: state === 'on'}, className)}>
      <input
        type="checkbox"
        id="themeSwitch"
        className="theme-switcher__input"
        value={state}
        onChange={handleSwitchStateChange}
      />
      <label htmlFor="themeSwitch" className="theme-switcher__label">
        <span/>
      </label>
    </div>
  )
}
