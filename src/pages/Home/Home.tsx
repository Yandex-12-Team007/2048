import React from 'react';
import {Link} from 'react-router-dom';

import Layout from 'Components/Layout';

import Nav from 'Constants/Nav';

import './Home.pcss';

export default function Home() {
  return <Layout title={'Главная'}>
    <div className={'home'}>
      <div className={'home__wrapper'}>
        <div className={'home__title-wrapper'}>
          <h2 className={'home__title'}>Добро пожаловать !</h2>
          <p className={'home__paragraph'}>
            В честь безмерной благодарности создателям оригинальной игры :
            "1024 by Veewo Studio". Наша версия нашумевшего бесцеллера
          </p>
          <h3 className={'home__subtitle'}>Выберите раздел :</h3>
        </div>
        <div className={'home__link-wrapper'}>
          {Nav.map((el) => <div className={'home__link-block'}>
            <Link className={'home__link'} to={el.link}>{el.title}</Link>
          </div>)}
        </div>
      </div>
    </div>
  </Layout>
}
