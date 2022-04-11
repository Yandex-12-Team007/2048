import React, {ButtonHTMLAttributes} from 'react';
import classNames from 'classnames';
import './Button.pcss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  const {
    className,
    text,
    ...restProps
  } = props;
  return (
    <button
      className={classNames('button', className)}
      {...restProps}
    >
      {text}
    </button>
  );
}
export default Button;
