import classNames from 'classnames';
import React, {forwardRef, InputHTMLAttributes, RefObject} from 'react';
import './Input.pcss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type?: string;
  className?: string;
  errorMessage?: string;
  errorClassName?: string;
}

const Input: React.FunctionComponent<IInputProps> = forwardRef((props, ref) => {
  const {
    id,
    className,
    label,
    type,
    errorMessage,
    errorClassName,
    ...restProps
  } = props;

  return (
    <div className='input-container'>
      {
        label && (
          <label
            className='input-container__label'
            htmlFor={id}
          >
            {label}
          </label>
        )
      }
      <input
        ref={ref as RefObject<HTMLInputElement>}
        id={id}
        className={classNames('input', className)}
        type={type || 'text'}
        {...restProps}
      />
      <span className={classNames('input__error-message', errorClassName)}>
        {errorMessage}
      </span>
    </div>
  )
});

export default Input;
