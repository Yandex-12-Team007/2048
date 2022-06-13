import React from 'react';
import {useSelector} from 'react-redux';
import {forumSelector, usersSelector} from 'Store/selectors';
import classNames from 'classnames';

import {formaDate} from 'Utils/dateHelper';

import {IForumState, IRootState, IUsersStore} from 'Interface/IRootState';
import {IComment} from 'Interface/IComment';

import './ForumMessage.pcss';

interface IForumMessageProps {
  content : string,
  commentId : null | number;
  isAnswer? : boolean
}

export default function ForumMessage({content, commentId, isAnswer = false}
  : IForumMessageProps) {
  const forum:IForumState = useSelector<IRootState, IForumState>(forumSelector);
  let answer : IComment | null = null;

  if (commentId !== null) {
    answer = forum.comment[commentId];
  }

  const forumMessageClass = classNames({
    'forum-message': true,
    'forum-message__answer': isAnswer,
  });

  return <div className={forumMessageClass}>
    {answer !== null ?
      <Answer answer={answer}/> :
      null
    }
    <p className={'forum-message__message'}>{content}</p>
  </div>
}

function Answer({answer} : {answer : IComment}) {
  const users:IUsersStore = useSelector<IRootState, IUsersStore>(usersSelector);
  const author = users[answer.author] ?
    users[answer.author].first_name :
    answer.author;

  return <fieldset className={'forum-message__answer-wrapper'}>
    <legend>
      {`${formaDate(answer.createdAt)} от: ${author}`}
    </legend>
    <ForumMessage
      content={answer.content}
      commentId={answer.commentId}
      isAnswer={true}
    />
  </fieldset>
}
