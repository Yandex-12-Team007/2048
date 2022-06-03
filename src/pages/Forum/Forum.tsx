import React, {useState, useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import Layout from 'Components/Layout';

import {topicApi} from 'Api/topicApi';

import {ITopic} from 'Interface/ITopic';
// import ServerApi from 'Api/server';

import './Forum.pcss';

export default function Forum() {
  const [topic] = useState<ITopic[]>([]);
  const history = useHistory();

  useEffect(() => {
    topicApi.getAll()
        .then((res) => console.log(res))
  }, []);

  return (
    <Layout
      contentClassName='forum-container'
      title={'Форум вопросов и ответов'}
    >
      <div className='forum-header'>
        <span className='forum-header__caption'>Топ</span>
        <button className='forum-header__add-button' />
        <button>GET</button>
        <button>POST</button>
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
              topic.map((theme, index) => (
                <tr
                  className='forum-table__row'
                  key={index}
                  onClick={
                    useCallback(() => history.push(`/forum/${theme.id}`), [])
                  }
                >
                  <td>{theme.title}</td>
                  <td className='forum-table__answer-count-cell'>
                    {0}
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
