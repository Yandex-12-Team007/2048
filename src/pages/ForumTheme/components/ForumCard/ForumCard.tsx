import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import {userApi} from 'Api/userApi';

import {IComment} from 'Interface/IComment';
import IUser, {Nullable} from 'Interface/IUser';

import {resourceLink} from 'Utils/uploadHelper';

import './ForumCard.pcss';

interface IForumCardProps {
  className?: string;
  comment: IComment
}

const ForumCard = ({
  comment, className,
} : IForumCardProps) => {
  const [user, setUser] = useState<Nullable<IUser>>(null);
  const {author, content, commentId} = comment;

  useEffect(() => {
    userApi.getUserById(author)
        .then((res) => res.json())
        .then((res) => setUser(res))
  }, [])


  return <div className={classNames('forum-card', className)}>
    <div className='forum-card__user-info'>
      {
        // @ts-ignore
        user !== null && user.avatar.length > 0 ?
          <img
            className='forum-card__user-avatar'
            // @ts-ignore
            src={resourceLink(user.avatar)}
            alt={'аватар'}
          /> :
          <div
            className={
              classNames(
                  'forum-card__user-avatar',
                  'forum-card__user-avatar--empty',
              )
            }
          />
      }
      <span className='forum-card__user-name'>{user !== null ? user.first_name : ''}</span>
    </div>
    {commentId !== null ? <div>Ответ на сообщение : {commentId}</div> : null}
    <div className='forum-card__message'>{content}</div>
  </div>
}

export default ForumCard;
