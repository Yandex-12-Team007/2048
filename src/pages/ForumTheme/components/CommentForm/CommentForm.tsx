import React from 'react';
import {object, string, number} from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSelector} from 'react-redux';
import {commentApi} from 'Api/commentApi';

import Button from 'Components/Button';
import ForumMessage from '../ForumMessage';

import {forumSelector, userSelector} from 'Store/selectors';

import {IComment, ICommentCreate} from 'Interface/IComment';
import {IForumState, IRootState} from 'Interface/IRootState';


import './CommentForm.pcss';

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
  const {handleSubmit, formState: {errors}, register} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      content: '',
      commentId: commentId,
    },
  });
  const user = useSelector<IRootState>(userSelector)

  // @ts-ignore
  const forum : IForumState = useSelector<IRootState>(forumSelector);
  let comment : IComment | null = null;

  if (commentId !== 0) {
    comment = forum.comment[commentId];
  }

  const handleComment = (
      {content}: { comment: string, commentId : number}
  ) => {
    let commentId = null;
    if (comment !== null) {
      commentId = comment.id;
    }

    const newComment : ICommentCreate = {
      content: content,
      topicId: topicId,
      author: user.id,
      commentId: commentId,
    }

    commentApi.create(newComment)
        .then((res) => console.log(res))
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
          text={'Отправить'}
        />
      </div>
    </form>
  </div>
}
