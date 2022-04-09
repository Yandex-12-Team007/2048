import React, {useState} from 'react';
import Button, {EButtonAppearance} from 'Components/Button/Button';
import TextInput from 'Components/TextInput/TextInput';
import './PasswordInfoEditing.pcss';

interface IPasswordInfoEditingProps {
  onSave: () => void;
}

const PasswordInfoEditing: React.FunctionComponent<IPasswordInfoEditingProps> = ({ onSave }) => {
  const [oldPassword, setOldPassword] = useState('12345');
  const [password, setPassword] = useState('12345');
  const [doublePassword, setDoublePassword] = useState('12345');

  const handleInfoSave = () => {
    //  TODO: сохранение с помощью api
    onSave();
  }

  return (
    <div className='profile-info-editing'>
      <ul className='profile-info-editing__list'>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Старый пароль</span>
          <TextInput
            className='profile-info-editing__input'
            type='password'
            value={oldPassword}
            onChange={setOldPassword}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Новый пароль</span>
          <TextInput
            className='profile-info-editing__input'
            type='password'
            value={password}
            onChange={setPassword}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Повторите новый пароль</span>
          <TextInput
            className='profile-info-editing__input'
            type='password'
            value={doublePassword}
            onChange={setDoublePassword}
          />
        </li>
      </ul>
      <Button
        appearance={EButtonAppearance.SUBMIT}
        className='profile-info-editing__submit-button'
        text='Сохранить'
        onClick={handleInfoSave}
      />
    </div>
  )
}

export default PasswordInfoEditing;
