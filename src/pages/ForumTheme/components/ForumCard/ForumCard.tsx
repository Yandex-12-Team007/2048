import React from 'react';
import classNames from 'classnames';
import ForumBadge from '../ForumBadge';
import ForumMessage from '../ForumMessage';
import ForumOptions from '../ForumOptions';

import {formaDate} from 'Utils/dateHelper';

import {IComment} from 'Interface/IComment';
import IUser, {Nullable} from 'Interface/IUser';

import {isEqual} from 'Utils/myLodash';

import './ForumCard.pcss';


interface IForumCardProps {
  className?: string;
  comment: IComment,
  user: Nullable<IUser>,
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
  const {author, content, createdAt, commentId} = comment;

  const img = commentUser !== null &&
  commentUser.avatar &&
  commentUser.avatar.length > 0 ? commentUser.avatar : null;

  const name = commentUser !== null ? commentUser.first_name : '';

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
  return isEqual(prevProps.comment, nextProps.comment) &&
    isEqual(prevProps.commentUser, nextProps.commentUser)
}

const MemoForumCard = React.memo(ForumCard, areEqual);

export default MemoForumCard;
