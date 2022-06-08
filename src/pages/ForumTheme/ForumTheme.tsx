import React, {useEffect, useState} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

import Layout from 'Components/Layout';
import TopicCard from './components/TopicCard';
import ForumCard from './components/ForumCard';
import CommentForm from './components/CommentForm';

import {userApi} from 'Api/userApi';

import {getForumState} from 'Store/actionCreators/forum';
import {forumSelector, usersSelector, userSelector} from 'Store/selectors';

import {IForumState, IRootState} from 'Interface/IRootState';
import {IComment} from 'Interface/IComment';
import IUser from 'Interface/IUser';

import Routes from 'Constants/Routes';

import './ForumTheme.pcss';
import {
  setUsersFromData,
} from 'Store/actionCreators/users';

export default function ForumTheme(props) {
  console.log(`ForumTheme`);
  // eslint-disable-next-line camelcase
  const {topicId} = useParams();
  const [answerId, setAnswerId] = useState(0);
  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();
  // @ts-ignore
  const forum : IForumState = useSelector<IRootState>(forumSelector);
  // @ts-ignore
  const users : IForumState = useSelector<IRootState>(usersSelector);
  // @ts-ignore
  const user : IUser = useSelector<IRootState>(userSelector);
  const {topic, topicComment} : IForumState = forum;

  useEffect(() => {
    if (topic.length === 0) {
      // @ts-ignore
      dispatch(getForumState());
    }
  }, []);

  if (topic.length === 0) {
    return <div>Loading...</div>
  }

  const currentTopic = topic.find((el) => el.id == topicId);

  if (!currentTopic) {
    return <Redirect to={Routes.ERROR_500}/>
  }

  // Переменная для отсеивания дубликатов пользователей
  const newUsersList = {};

  Promise.all(topicComment[currentTopic.id].filter((comment) => {
    if (!users[comment.author] && !newUsersList[comment.author]) {
      // Заполняем словать дублей
      newUsersList[comment.author] = true;
      return true;
    }
    return false;
  }).map((comment) => {
    return userApi.getUserById(comment.author)
        .then((res) => res.json())
  }))
      .then((res) => {
        dispatch(setUsersFromData(res));
      })

  // @ts-ignore
  const comments : IComment[] = topicComment[currentTopic.id] ?? [];

  function unsetCommentId() {
    setAnswerId(0);
  }

  function setCommentId(id) {
    setAnswerId(id);
  }

  return (
    <Layout
      contentClassName='forum-theme-container'
      title={currentTopic.title}
    >
      <div className={'forum-theme__scroll'}>
        <TopicCard topic={currentTopic} />
        {
          comments.map((comment) => (
            <ForumCard
              key={comment.id}
              className='forum-theme__card'
              comment={comment}
              user={user}
              commentUser={users[comment.author] ?? null}
              setCommentId={setCommentId}
            />
          ))
        }
        <CommentForm
          commentId={answerId}
          unsetCommentId={unsetCommentId}
          topicId={currentTopic.id}
        />
      </div>
    </Layout>
  )
}
