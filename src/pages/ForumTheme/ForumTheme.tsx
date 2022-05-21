import Layout from 'Components/Layout';
import React from 'react';
import ForumCard from './components/ForumCard';
import './ForumTheme.pcss';

const answerList = [
  {
    name: 'Иван',
    avatar: '',
    text: 'Текст темы/комментария',
  },
  {
    name: 'Петр',
    avatar: '',
    text: 'Текст темы/комментария',
  },
]

export default function ForumTheme() {
  return (
    <Layout
      contentClassName='forum-theme-container'
      title='Название темы форума'
    >
      {
        answerList.map((answer) => (
          <ForumCard
            className='forum-theme__card'
            userName={answer.name}
            userAvatar={answer.avatar}
            text={answer.text}
          />
        ))
      }
    </Layout>
  )
}
