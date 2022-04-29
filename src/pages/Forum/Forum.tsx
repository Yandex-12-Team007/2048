import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import Layout from 'Components/Layout';
import './Forum.pcss';

const mockThemeList = [
  {
    id: 1,
    themeName: 'Новые игры',
    answersCount: 20333,
    author: 'Иван',
  },
  {
    id: 2,
    themeName: 'Геймдизайнеры',
    answersCount: 20333,
    author: 'Иван',
  },
  {
    id: 3,
    themeName: 'Технологии',
    answersCount: 20333,
    author: 'Иван',
  },
];

export default function Forum() {
  const history = useHistory();

  return (
    <Layout
      contentClassName='forum-container'
      title={'Форум вопросов и ответов'}
    >
      <div className='forum-header'>
        <span className='forum-header__caption'>Топ</span>
        <button className='forum-header__add-button' />
      </div>
      <div className='forum-content'>
        <table className='forum-table'>
          <thead>
            <tr>
              <td>Название темы</td>
              <td className='forum-table__answer-count-cell'>Ответов</td>
              <td className='forum-table__author-cell'>Автор</td>
            </tr>
          </thead>
          <tbody>
            {
              mockThemeList.map((theme, index) => (
                <tr
                  className='forum-table__row'
                  key={index}
                  onClick={
                    useCallback(() => history.push(`/forum/${theme.id}`), [])
                  }
                >
                  <td>{theme.themeName}</td>
                  <td className='forum-table__answer-count-cell'>
                    {theme.answersCount}
                  </td>
                  <td className='forum-table__author-cell'>{theme.author}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
