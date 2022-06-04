import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Layout from 'Components/Layout';

import {getForumState} from 'Store/actionCreators/forum';
import {forumSelector} from 'Store/selectors';

import {IForumState, IRootState} from 'Interface/IRootState';

import {routeReplace} from 'Utils/routeReplace';

import Routes from 'Constants/Routes';

// import {ITopic} from 'Interface/ITopic';
// import ServerApi from 'Api/server';

import './Forum.pcss';


export default function Forum() {
  const dispatch = useDispatch();
  // @ts-ignore
  const forum : IForumState = useSelector<IRootState>(forumSelector);
  const {topic, comment, topicComment} = forum;

  useEffect(() => {
    if (topic.length === 0) {
      // @ts-ignore
      dispatch(getForumState());
    }
  }, []);

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
              forum.topic.map((theme, index) => (
                <Link
                  className='forum-table__row table-row'
                  key={theme.id}
                  to={routeReplace(Routes.FORUM_THEME, 'topicId', ''+theme.id)}
                >
                  <td>{theme.title}</td>
                  <td className='forum-table__answer-count-cell'>
                    {
                      // @ts-ignore
                      topicComment[theme.id].length
                    }
                  </td>
                  <td className='forum-table__author-cell'>{theme.author}</td>
                </Link>
              ))
            }
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
