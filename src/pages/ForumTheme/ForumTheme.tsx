import React, {useEffect, useState} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {Scrollbar} from 'react-scrollbars-custom';

import Layout from 'Components/Layout';
import TopicCard from './components/TopicCard';
import ForumCard from './components/ForumCard';
import CommentForm from './components/CommentForm';

import {userApi} from 'Api/userApi';

import {getForumState} from 'Store/actionCreators/forum';
import {forumSelector, usersSelector, userSelector} from 'Store/selectors';

import {IForumState, IRootState, IUsersStore} from 'Interface/IRootState';
import {IComment} from 'Interface/IComment';
import IUser, {Nullable} from 'Interface/IUser';

import Routes from 'Constants/Routes';

import './ForumTheme.pcss';
import {
  setUsersFromData,
} from 'Store/actionCreators/users';

export default function ForumTheme() {
  // eslint-disable-next-line camelcase
  const {topicId} = useParams();
  const [answerId, setAnswerId] = useState(0);
  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();
  const forum: IForumState = useSelector<IRootState, IForumState>(forumSelector)
  const users: IUsersStore = useSelector<IRootState, IUsersStore>(usersSelector)
  const user : Nullable<IUser> = useSelector<
    IRootState,
    Nullable<IUser>
  >(userSelector);
  const {topic, topicComment} : IForumState = forum;

  useEffect(() => {
    if (topic.length === 0) {
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
  const comments : IComment[] = topicComment[currentTopic.id] ?? [];

  if (Array.isArray(comments) && comments.length > 0) {
    Promise.all(comments.filter((comment) => {
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
  }

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
      <Scrollbar className={'forum-theme__scroll'}>
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
      </Scrollbar>
    </Layout>
  )
}
