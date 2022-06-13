import React, {useEffect, useState} from 'react';

import ForumBadge from '../ForumBadge';

import {userApi} from 'Api/userApi';

import {formaDate} from 'Utils/dateHelper';

import {ITopic} from 'Interface/ITopic';
import IUser, {Nullable} from 'Interface/IUser';

import './TopicCard.pcss';

interface ITopicCardProps {
  topic : ITopic
}

export default function TopicCard({topic} : ITopicCardProps) {
  const {author, content, createdAt} = topic;
  const [topicUser, setTopicUser] = useState<Nullable<IUser>>(null);

  useEffect(() => {
    userApi.getUserById(author)
        .then((res) => res.json())
        .then((res) => setTopicUser(res))
  }, [])

  const img = topicUser !== null &&
  topicUser.avatar &&
  topicUser.avatar.length > 0 ? topicUser.avatar : null;

  const name = topicUser !== null ? topicUser.first_name : '';

  return <div className={'topic-card'}>
    <ForumBadge
      img={img}
      name={name}
    />
    <div className={'topic-card__message-wrapper'}>
      <div className={'topic-card__time-wrapper'}>
        {formaDate(createdAt)}
      </div>
      <h2>{content}</h2>
    </div>
  </div>
}
