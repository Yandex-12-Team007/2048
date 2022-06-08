import React from 'react';

import {resourceLink} from 'Utils/uploadHelper';

interface IForumBadgeProps {
  name : string,
  img : string | null
}

import './ForumBadge.pcss';

// TODO: Тут надо будет предусмотреть вариант для мобильных, но пока горим =)
export default function ForumBadge({name, img} : IForumBadgeProps) {
  return <div className={'forum-badge'}>
    {img !== null ? <AvatarImg img={img} /> : <EmptyImg />}
    <span className='forum-card__user-name'>{name !== null ? name : ''}</span>
  </div>
}


function EmptyImg() {
  return <div className={'forum-badge__default-img'} />
}

function AvatarImg({img}) {
  return <img
    className={'forum-badge__img'}
    alt={'avatar'}
    src={resourceLink(img)}
  />
}
