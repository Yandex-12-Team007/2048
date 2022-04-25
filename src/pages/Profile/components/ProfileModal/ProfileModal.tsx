import React, {useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';

import DefaultModal from 'Components/Modal/DefaultModal';
import Button from 'Components/Button/Button';

import {userController} from 'Controllers/userController';

import './ProfileModal.pcss';

const _ = require('lodash');

enum ErrorType {
  VALID,
  QUERY
}

const DEFAULT_ERROR_STATE = {
  [ErrorType.VALID] : false,
  [ErrorType.QUERY] : false,
}

const VALID_ERROR_TEXT = 'Нужно выбрать файл';
const QUERY_ERROR_TEXT = 'Ошибка, попробуйте еще раз';

export default function ProfileModal({isOpen = true, setIsOpen}) {
  const avatar = useRef<HTMLInputElement>(null);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [error, setError] = useState(DEFAULT_ERROR_STATE);

  function changeFile() {
    if(avatar.current?.files?.length === 1){
      setError(_.clone(DEFAULT_ERROR_STATE));
      setIsFileUpload(true);
      return
    }

    let updatedError = error;
    updatedError[ErrorType.VALID] = true;
    setError(updatedError);
  }

  function uploadFile() {
    const {current} = avatar;
    if(!current?.files) {
      let updatedError = error;
      updatedError[ErrorType.VALID] = true;
      setError(updatedError);
      return;
    }
    const file = current.files[0];

    userController.uploadProfileImg(file)
      .then(res => {

      })
      .catch(err => {
        let updatedError = error;
        updatedError[ErrorType.QUERY] = true;
        setError(updatedError);
      })
  }

  function close() {
    setIsOpen(false);
  }

  console.log(avatar);
  const titleClass = classNames({
    'profile-modal__title' : true,
    'profile-modal__title_error' : error[ErrorType.QUERY],
  });
  const title = error[ErrorType.QUERY] ? QUERY_ERROR_TEXT :
    isFileUpload ? 'Аватар загружен' : 'Загрузить аватар';


  let label = 'Выбрать файл на компьютере';
  const labelClass = classNames({
    'profile-modal__label' : true,
    'profile-modal__label_done' : isFileUpload
  });
  if(isFileUpload) {
    const {current} = avatar;
    if(!current || !current.files){
      throw new Error('undefined file');
    }
    const file = current.files[0];
    label = file.name;
  }

  return <DefaultModal
    isOpen={isOpen}
    close={close}
    addClass={'profile-modal'}
  >
    <div className={'profile-modal__title-wrapper'}>
      <span className={titleClass}>{title}</span>
      <FontAwesomeIcon
        className={'profile-modal__icon'}
        icon={faXmark}
        onClick={close}
      />
    </div>
    <div className={'profile-modal__body-wrapper'}>
      <label className={labelClass} htmlFor={'avatar'}>{label}</label>
      <input
        id={'avatar'}
        className={'profile-modal__file'}
        type={'file'}
        name={'avatar'}
        ref={avatar}
        onChange={changeFile}
      />
    </div>
    <div className={'profile-modal__action-wrapper'}>
      <Button
        disabled={!isFileUpload}
        className={'profile-modal__action'}
        onClick={uploadFile}
        text={'Загрузить'}
      />
      {error[ErrorType.VALID] ?
        <div className={'profile-modal__error'}>{VALID_ERROR_TEXT}</div>
        :
        null
      }
    </div>
  </DefaultModal>
}
