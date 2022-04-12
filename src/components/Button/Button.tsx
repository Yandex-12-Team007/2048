import React, {ButtonHTMLAttributes} from 'react';
import classNames from 'classnames';
import './Button.pcss';

export enum ButtonAppearance {
  SUBMIT,
  TEXT,
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  appearance?: ButtonAppearance;
  className?: string;
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  const {
    appearance,
    className,
    text,
    ...restProps
  } = props;
  return (
    <button
      className={
        classNames(
            'button',
            className,
            {'button--text': appearance === ButtonAppearance.TEXT},
        )
      }
      {...restProps}
    >
      {text}
    </button>
  );
}
export default Button;
