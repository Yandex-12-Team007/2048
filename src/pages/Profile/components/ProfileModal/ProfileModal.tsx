import React, {useRef, useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';

import DefaultModal from 'Components/Modal/DefaultModal';
import Button from 'Components/Button/Button';

import {userController} from 'Controllers/userController';

import {cloneDeep} from 'Utils/myLodash';

import './ProfileModal.pcss';

enum ErrorType {
  VALID,
  QUERY
}

const DEFAULT_ERROR_STATE = {
  [ErrorType.VALID]: false,
  [ErrorType.QUERY]: false,
}

const VALID_ERROR_TEXT = 'Нужно выбрать файл';
const QUERY_ERROR_TEXT = 'Ошибка, попробуйте еще раз';

export default function ProfileModal({isOpen = true, setIsOpen}) {
  const avatar = useRef<HTMLInputElement>(null);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [error, setError] = useState(DEFAULT_ERROR_STATE);

  const dispatch = useDispatch();

  const changeFile = useCallback(() => {
    if (avatar.current?.files?.length === 1) {
      // @ts-ignore
      setError(cloneDeep(DEFAULT_ERROR_STATE));
      setIsFileUpload(true);
      return
    }

    const updatedError = error;
    updatedError[ErrorType.VALID] = true;
    setError(updatedError);
  }, [avatar.current]);

  const uploadFile = useCallback(() => {
    const {current} = avatar;
    if (!current?.files) {
      const updatedError = error;
      updatedError[ErrorType.VALID] = true;
      setError(updatedError);
      return;
    }
    const file = current.files[0];

    userController.uploadProfileImg(dispatch, file)
        .then(() => {
          close();
        })
        .catch(() => {
          const updatedError = error;
          updatedError[ErrorType.QUERY] = true;
          setError(updatedError);
        })
  }, [avatar.current]);

  const close = useCallback(() => setIsOpen(false), []);

  const titleClass = classNames({
    'profile-modal__title': true,
    'profile-modal__title_error': error[ErrorType.QUERY],
  });
  const title = error[ErrorType.QUERY] ? QUERY_ERROR_TEXT :
    isFileUpload ? 'Аватар загружен' : 'Загрузить аватар';


  let label = 'Выбрать файл на компьютере';
  const labelClass = classNames({
    'profile-modal__label': true,
    'profile-modal__label_done': isFileUpload,
  });

  if (isFileUpload) {
    const {current} = avatar;
    if (!current || !current.files) {
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
      <span className={'profile-modal__cross'} onClick={close}/>
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
        <div className={'profile-modal__error'}>{VALID_ERROR_TEXT}</div> :
        null
      }
    </div>
  </DefaultModal>
}
