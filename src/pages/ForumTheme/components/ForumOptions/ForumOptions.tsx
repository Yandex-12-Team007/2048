import React from 'react';

import IUser from 'Interface/IUser';

import './ForumOptions.pcss';

interface IForumOptions {
  user : IUser | null,
  author : number,
  commentId : number,
  setCommentId : (number) => void,
}

export default function ForumOptions({user, author, commentId, setCommentId} : IForumOptions) {
  if (user === null) {
    return null
  }

  const isAuthor = user.id == author;

  return <div className={'forum-options'}>
    {isAuthor ?
      <>
        <AuthorOptions />
        <UserOptions
          setCommentId={setCommentId}
          commentId={commentId}
        />
      </> :
      <UserOptions
        setCommentId={setCommentId}
        commentId={commentId}
      />
    }
  </div>
}

function AuthorOptions() {
  return <>
    <div>Изменить</div>
    <div>Удалить</div>
  </>
}

function UserOptions({setCommentId, commentId}) {
  return <>
    <div
      onClick={() => setCommentId(commentId)}
    >
      Ответить
    </div>
  </>
}
