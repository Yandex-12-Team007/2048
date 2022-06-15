import React from 'react';
import {object, string} from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import DefaultModal from 'Components/Modal/DefaultModal';
import Input from 'Components/Input';
import Button, {ButtonAppearance} from 'Components/Button';

import './TopicModel.pcss'

interface TopicModalProps {
  isOpen: boolean
  action: (title, content) => void
  close: (title : string, content : string) => void
}

const ADD_MODAL = 'Добавить вопрос';

const schema = object({
  title: string(),
  content: string(),
}).required();

export default function TopicModal({
  isOpen = false,
  action = () => {},
  close = () => {},
} : TopicModalProps) {
  const {handleSubmit, formState: {errors}, register} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const handleComment = (
      {title, content} : { title: string, content : number}
  ) => {
    action(title, content);
    close();
  }


  return <DefaultModal isOpen={isOpen} close={close}>
    <div className={'topic-modal'}>
      <div className={'topic-modal__title-wrapper'}>
        <h2 className={'topic-modal__title'}>{ADD_MODAL}</h2>
      </div>
      <div className={'topic-modal__form-content'}>
        <form
          className={'topic-modal__form-wrapper'}
          onSubmit={handleSubmit(handleComment)}
        >
          <div className={'topic-modal__content-wrapper'}>
            <Input
              id={'title'}
              className={''}
              label={'Заголовок'}
              type={'text'}
              errorMessage={errors.title?.message}
              {...register('title')}
            />
            <Input
              id={'content'}
              className={''}
              label={'Вопрос'}
              type={'text'}
              errorMessage={errors.content?.message}
              {...register('content')}
            />
          </div>
          <div className={'topic-modal__action-wrapper'}>
            <Button
              text={'Добавить'}
              appearance={ButtonAppearance.SUBMIT}
            />
          </div>
        </form>
      </div>
    </div>
  </DefaultModal>
}
