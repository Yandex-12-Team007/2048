import React from 'react';
import {object, string, number} from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';

import Button from 'Components/Button';
import ForumMessage from '../ForumMessage';

import {forumSelector, userSelector} from 'Store/selectors';
import {addComment} from 'Store/actionCreators/forum';

import {IComment, ICommentCreate} from 'Interface/IComment';
import IUser, {Nullable} from 'Interface/IUser';
import {IForumState, IRootState} from 'Interface/IRootState';


import './CommentForm.pcss';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

const schema = object({
  content: string().min(
      1,
      'Комментарий не может быть пустым !',
  ),
  answerId: number(),
}).required();

interface IContentFormProps {
  commentId : number,
  unsetCommentId : () => void,
  topicId: number
}

export default function CommentForm({
  commentId = 0,
  unsetCommentId,
  topicId,
} : IContentFormProps) {
  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();
  const {
    resetField,
    handleSubmit,
    formState: {errors},
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      content: '',
      commentId: commentId,
    },
  });
  const user : Nullable<IUser> = useSelector<
    IRootState,
    Nullable<IUser>
    >(userSelector)

  const forum:IForumState = useSelector<IRootState, IForumState>(forumSelector);
  let comment : IComment | null = null;

  if (commentId !== 0) {
    comment = forum.comment[commentId];
  }

  const handleComment = (
      {content}: { content: string}
  ) => {
    let realCommentId : number | null = null;
    if (comment !== null) {
      realCommentId = comment.id;
    }

    // TODO: При отсутствии пользователя - выдавать ошибку
    if (user === null) {
      return;
    }

    const newComment : ICommentCreate = {
      content: content,
      topicId: topicId,
      author: user.id,
      commentId: realCommentId,
    }

    dispatch(addComment(newComment))
    unsetCommentId();
    resetField('content');
  }

  return <div className={'comment-form'}>
    <form
      className={'comment-form'}
      onSubmit={handleSubmit(handleComment)}
    >
      <div className={'comment-form__form-wrapper'}>
        <input
          id={'commentId'}
          value={commentId}
          disabled={true}
          {...register('commentId')}
        />
        {comment !== null ?
          <div>
            <label
              className={'comment-form__label'}
              htmlFor={'commentId'}
            >
              Ответ на :
            </label>
            <ForumMessage
              content={comment.content}
              commentId={comment.commentId}
              isAnswer={true}
            />
            <Button
              text={'Убрать'}
              onClick={unsetCommentId}
            />
          </div> :
          null
        }
      </div>
      <div className={'comment-form__form-wrapper'}>
        <label
          className={'comment-form__label'}
          htmlFor={'comment'}
        >
          Напишите свой ответ :
        </label>
        <textarea
          id={'content'}
          rows={4}
          className={'comment-form__textarea'}
          {...register('content')}
        />
        <span
          className={'comment-form__error'}
        >
          {errors?.content ? errors?.content.message : null}
        </span>
      </div>
      <div className={'comment-form__btn-wrapper'}>
        <Button
          className={'comment-form__btn'}
          type={'submit'}
          text={'Отправить'}
        />
      </div>
    </form>
  </div>
}
