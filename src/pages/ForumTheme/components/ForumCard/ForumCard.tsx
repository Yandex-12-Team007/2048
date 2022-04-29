import React, {FunctionComponent} from 'react';
import classNames from 'classnames';
import './ForumCard.pcss';

interface IForumCardProps {
  userName: string;
  userAvatar: string;
  text: string;
  className?: string;
}

const ForumCard: FunctionComponent<IForumCardProps> = ({
  userName, userAvatar, text, className,
}) => {
  return (
    <div className={classNames('forum-card', className)}>
      <div className='forum-card__user-info'>
        {
          userAvatar.length > 0 ?
          <img
            className='forum-card__user-avatar'
            src={userAvatar}
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
        <span className='forum-card__user-name'>{userName}</span>
      </div>
      <div className='forum-card__message'>{text}</div>
    </div>
  )
}

export default ForumCard;
