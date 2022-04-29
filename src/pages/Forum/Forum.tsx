import React from 'react';

import Layout from 'Components/Layout';

export default function Forum() {
  return (
    <Layout title={'Форум вопросов и ответов'}>
      <div className='forum-header'>
        <span>Топ</span>
        <button className='forum-header__add-button' />
      </div>
      <div className='forum-content'>
        <table className='forum-table'>
          <thead>
            <tr>
              <td>Название темы</td>
              <td>Ответов</td>
              <td>Автор</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Новые игры</td>
              <td>20333</td>
              <td>Иван</td>
            </tr>
            <tr>
              <td>Геймдизайнеры</td>
              <td>20333</td>
              <td>Иван</td>
            </tr>
            <tr>
              <td>Технологии</td>
              <td>20333</td>
              <td>Иван</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
