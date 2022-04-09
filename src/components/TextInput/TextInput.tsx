import classNames from 'classnames';
import React, {ChangeEvent} from 'react';
import './TextInput.pcss';

interface ITextInputProps {
  value: string;
  type?: string;
  onChange: (value: string) => void;
  className?: string;
}

const TextInput: React.FunctionComponent<ITextInputProps> = ({className, type, value, onChange}) => {
  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }

  return (
    <input
      className={classNames('text-input', className)}
      type={type || 'text'}
      value={value}
      onChange={handleValueChange}
    />
  )
};

export default TextInput;
