import React, {useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Layout from 'Components/Layout';
import ForumCard from './components/ForumCard';

import {getForumState} from 'Store/actionCreators/forum';
import {forumSelector} from 'Store/selectors';

import {IForumState, IRootState} from 'Interface/IRootState';
import {IComment} from 'Interface/IComment';

import Routes from 'Constants/Routes';

import './ForumTheme.pcss';

export default function ForumTheme(props) {
  // eslint-disable-next-line camelcase
  const {topicId} = useParams();
  const dispatch = useDispatch();
  // @ts-ignore
  const forum : IForumState = useSelector<IRootState>(forumSelector);
  const {topic, topicComment} : IForumState = forum;

  useEffect(() => {
    if (topic.length === 0) {
      // @ts-ignore
      dispatch(getForumState());
    }
  }, []);

  if (topic.length === 0) {
    console.log('topic.length');
    return <div>Loading...</div>
  }

  const currentTopic = topic.find((el) => el.id == topicId);

  if (!currentTopic) {
    return <Redirect to={Routes.ERROR_500}/>
  }

  // @ts-ignore
  const comments : IComment[] = topicComment[currentTopic.id] ?? [];

  return (
    <Layout
      contentClassName='forum-theme-container'
      title={currentTopic.title}
    >
      <div>
        <h2>{currentTopic.title}</h2>
        <p>{currentTopic.content}</p>
      </div>
      {
        comments.map((comment) => (
          <ForumCard
            key={comment.id}
            className='forum-theme__card'
            comment={comment}
          />
        ))
      }
    </Layout>
  )
}
