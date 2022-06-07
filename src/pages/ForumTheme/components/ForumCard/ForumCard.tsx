import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {useSelector} from 'react-redux';

import {userSelector} from 'Store/selectors';

import ForumBadge from '../ForumBadge';
import ForumMessage from '../ForumMessage';
import ForumOptions from '../ForumOptions';

import {userApi} from 'Api/userApi';

import {IComment} from 'Interface/IComment';
import IUser, {Nullable} from 'Interface/IUser';
import {IRootState} from 'Interface/IRootState';

import './ForumCard.pcss';

interface IForumCardProps {
  className?: string;
  comment: IComment,
  setCommentId: (number) => void
}

const ForumCard = ({
  comment, className, setCommentId,
} : IForumCardProps) => {
  const user = useSelector<IRootState>(userSelector)
  const [commentUser, setCommentUser] = useState<Nullable<IUser>>(null);
  const {author, content, createdAt, commentId} = comment;

  useEffect(() => {
    userApi.getUserById(author)
        .then((res) => res.json())
        .then((res) => setCommentUser(res))
  }, [])

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
            {createdAt}
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

export default ForumCard;
