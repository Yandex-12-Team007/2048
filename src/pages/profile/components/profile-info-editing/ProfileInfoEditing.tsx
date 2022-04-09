import React, {useState} from 'react';
import Button, {EButtonAppearance} from 'Components/Button/Button';
import TextInput from 'Components/TextInput/TextInput';
import './ProfileInfoEditing.pcss';

interface IProfileInfoEditingProps {
  onSave: () => void;
}

const ProfileInfoEditing: React.FunctionComponent<IProfileInfoEditingProps> = ({ onSave }) => {
  const [mail, setMail] = useState('pochta@yandex.ru');
  const [login, setLogin] = useState('ivanivanov');
  const [firstName, setFirstName] = useState('Иван');
  const [secondName, setSecondName] = useState('Иванов');

  const handleInfoSave = () => {
    //  TODO: сохранение с помощью api
    onSave();
  }

  return (
    <div className='profile-info-editing'>
      <ul className='profile-info-editing__list'>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Почта</span>
          <TextInput
            className='profile-info-editing__input'
            value={mail}
            onChange={setMail}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Логин</span>
          <TextInput
            className='profile-info-editing__input'
            value={login}
            onChange={setLogin}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Имя</span>
          <TextInput
            className='profile-info-editing__input'
            value={firstName}
            onChange={setFirstName}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Фамилия</span>
          <TextInput
            className='profile-info-editing__input'
            value={secondName}
            onChange={setSecondName}
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

export default ProfileInfoEditing;
