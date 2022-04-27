import Routes from 'Constants/Routes';
import React from 'react';
import {Link} from 'react-router-dom';
import './Error.pcss';

export default function Error() {
  return (
    <div className='error-page'>
      <p className='error-page__title'>
        <span className='error-page__title-part'>4</span>
        <span className='error-page__title-part'>0</span>
        <span className='error-page__title-part'>4</span>
      </p>
      <p className='error-page__subtitle'>Не туда попали</p>
      <Link
        className='error-page__link'
        to={Routes.GAME}
      >
        К игре
      </Link>
    </div>
  )
}
