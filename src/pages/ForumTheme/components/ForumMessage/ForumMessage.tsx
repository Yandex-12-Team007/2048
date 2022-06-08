import React from 'react';
import {useSelector} from 'react-redux';
import {forumSelector} from 'Store/selectors';
import classNames from 'classnames';

import {IForumState, IRootState} from 'Interface/IRootState';
import {IComment} from 'Interface/IComment';

import './ForumMessage.pcss';

interface IForumMessageProps {
  content : string,
  commentId : null | number;
  isAnswer? : boolean
}

export default function ForumMessage({content, commentId, isAnswer = false}
  : IForumMessageProps) {
  // @ts-ignore
  const forum : IForumState = useSelector<IRootState>(forumSelector);
  let answer : IComment | null = null;

  if (commentId !== null) {
    answer = forum.comment[commentId];
  }

  const forumMessageClass = classNames({
    'forum-message': true,
    'forum-message_answer': isAnswer,
  });

  return <div className={forumMessageClass}>
    {answer !== null ?
      <div className={'forum-message__answer-wrapper'}>
        <ForumMessage
          content={answer.content}
          commentId={answer.commentId}
          isAnswer={true}
        />
      </div> :
      null
    }
    {content}
  </div>
}
