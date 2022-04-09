import React from 'react';
import classNames from 'classnames';
import './Button.pcss';

export enum EButtonAppearance {
  TEXT,
  SUBMIT,
}

interface IButtonProps {
  appearance: EButtonAppearance;
  text: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FunctionComponent<IButtonProps> = ({
  appearance,
  text,
  onClick,
  className,
}) => {
  function getClassNameByAppearance() {
    switch (appearance) {
      case EButtonAppearance.TEXT:
        return 'button--text';
      case EButtonAppearance.SUBMIT:
        return 'button--submit';
    }
  }

  return (
    <button
      className={classNames('button', getClassNameByAppearance(), className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
export default Button;
