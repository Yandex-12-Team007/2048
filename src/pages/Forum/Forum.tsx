import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {useDispatch, useSelector} from 'react-redux';

import Layout from 'Components/Layout';
import TopicModal from './components/TopicModal';

import {getForumState, createTopic} from 'Store/actionCreators/forum';
import {getUser} from 'Store/actionCreators/users';
import {forumSelector, userSelector, usersSelector} from 'Store/selectors';

import {IForumState, IRootState, IUsersStore} from 'Interface/IRootState';

import {routeReplace} from 'Utils/routeReplace';

import Routes from 'Constants/Routes';

import './Forum.pcss';
import {ITopicCreate} from 'Interface/ITopic';


export default function Forum() {
  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();
  // @ts-ignore
  const forum : IForumState = useSelector<IRootState>(forumSelector);
  // @ts-ignore
  const users : IUsersStore = useSelector<IRootState>(usersSelector);
  const user : IUsersStore = useSelector<IRootState>(userSelector);
  const [modal, setModal] = useState(false);
  const {topic, topicComment} = forum;

  useEffect(() => {
    if (topic.length === 0) {
      // @ts-ignore
      dispatch(getForumState());
    }
  }, []);

  useEffect(() => {
    topic.forEach((el) => {
      if (!users[el.author]) {
        dispatch(getUser(el.author))
      }
    })
  }, [topic])

  function createTopicFunc(title : string, content : string) {
    const newTopic : ITopicCreate = {
      title: title,
      content: content,
      author: user.id,
    }

    dispatch(createTopic(newTopic))
  }

  console.log(forum);

  return (
    <Layout
      contentClassName='forum-container'
      title={'Форум вопросов и ответов'}
    >
      <div className='forum-header'>
        <span className='forum-header__caption'>Топ</span>
        <button onClick={() => setModal(true)} className='forum-header__add-button'/>
      </div>
      <div className='forum-content'>
        <div className='forum-content__header'>
          <div className='forum-content__row'>
            <div className={'forum-content__cell'}>Название темы</div>
            <div className={'forum-content__cell'}>Ответов</div>
            <div className={'forum-content__cell'}>Автор</div>
          </div>
        </div>
        <div className='forum-content__body'>
          {forum.topic.map((theme, index) => <Link
            className='forum-content__row table-row'
            key={theme.id}
            to={routeReplace(Routes.FORUM_THEME, 'topicId', ''+theme.id)}
          >
            <div className={'forum-content__cell'}>{theme.title}</div>
            <div className={'forum-content__cell'}>{topicComment[theme.id] ? topicComment[theme.id].length : 0}</div>
            <div className={'forum-content__cell'}>{users[theme.author] ? users[theme.author].login : theme.author}</div>
          </Link>
          )}
        </div>
      </div>
      <TopicModal
        isOpen={modal}
        close={() => setModal(false)}
        action={createTopicFunc}
      />
    </Layout>
  );
}
