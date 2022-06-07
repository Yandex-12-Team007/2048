import React, {useEffect, useState} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Layout from 'Components/Layout';
import TopicCard from './components/TopicCard';
import ForumCard from './components/ForumCard';
import CommentForm from './components/CommentForm';

import {getForumState} from 'Store/actionCreators/forum';
import {forumSelector} from 'Store/selectors';

import {IForumState, IRootState} from 'Interface/IRootState';
import {IComment} from 'Interface/IComment';

import Routes from 'Constants/Routes';

import './ForumTheme.pcss';

export default function ForumTheme(props) {
  // eslint-disable-next-line camelcase
  const {topicId} = useParams();
  const [answerId, setAnswerId] = useState(0);
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
    return <div>Loading...</div>
  }

  const currentTopic = topic.find((el) => el.id == topicId);

  if (!currentTopic) {
    return <Redirect to={Routes.ERROR_500}/>
  }

  // @ts-ignore
  const comments : IComment[] = topicComment[currentTopic.id] ?? [];

  function unsetCommentId() {
    setAnswerId(0);
  }

  function setCommentId(id) {
    console.log('setCommentId');
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
