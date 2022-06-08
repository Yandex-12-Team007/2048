import React from 'react';
import classNames from 'classnames';
import ForumBadge from '../ForumBadge';
import ForumMessage from '../ForumMessage';
import ForumOptions from '../ForumOptions';

import {formaDate, formatFullDate} from 'Utils/dateHelper';

import {IComment} from 'Interface/IComment';
import IUser from 'Interface/IUser';

import _ from 'lodash';

import './ForumCard.pcss';


interface IForumCardProps {
  className?: string;
  comment: IComment,
  user: IUser,
  commentUser: null | IUser,
  setCommentId: (number) => void
}

const ForumCard = ({
  className,
  comment,
  user,
  commentUser,
  setCommentId,
} : IForumCardProps) => {
  console.log(`ForumCard ${comment.id}`);
  const {author, content, createdAt, commentId} = comment;

  const img = commentUser !== null &&
  commentUser.avatar &&
  commentUser.avatar.length > 0 ? commentUser.avatar : null;

  const name = commentUser !== null ? commentUser.login : '';

  return <div className={classNames('forum-card', className)}>
    <div className={'forum-card__card-wrapper'}>
      <div className={'forum-card__content-wrapper'}>
        <ForumBadge
          img={img}
          name={name}
        />
        <div className={'forum-card__message-wrapper'}>
          <div className={'forum-card__time-wrapper'}>
            {formaDate(createdAt)}
          </div>
          <ForumMessage
            commentId={commentId}
            content={content}
          />
        </div>
      </div>
    </div>
    <ForumOptions
      user={user}
      author={author}
      commentId={comment.id}
      setCommentId={setCommentId}
    />
  </div>
}

function areEqual(prevProps, nextProps) {
  return _.isEqual(prevProps.comment, nextProps.comment) &&
    _.isEqual(prevProps.commentUser, nextProps.commentUser)
}

const MemoForumCard = React.memo(ForumCard, areEqual);

export default MemoForumCard;
