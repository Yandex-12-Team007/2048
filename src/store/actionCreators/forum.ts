import {Dispatch} from 'redux';

import {forumApi} from 'Api/forumApi';
import {topicApi} from 'Api/topicApi';
import {commentApi} from 'Api/commentApi';

import {ITopicCreate} from 'Interface/ITopic';
import {ICommentCreate} from 'Interface/IComment';
// import {commentApi} from 'Api/commentApi';

export enum ForumActionTypes {
  GET_STATE= 'GET_STATE',
  ADD_TOPIC= 'ADD_TOPIC',
  ADD_NEW_COMMENT='ADD_NEW_COMMENT',
}

export const getForumState = () =>
  (dispatch: Dispatch) => {
    return forumApi.getState().then((response) => {
      dispatch({type: ForumActionTypes.GET_STATE, payload: response});
    }).catch(() => {
      // console.log('getForumState bad request')
    })
  };

export const createTopic = (newTopic : ITopicCreate) =>
  (dispatch: Dispatch) => {
    return topicApi.create(newTopic)
        .then((res) => {
          dispatch({type: ForumActionTypes.ADD_TOPIC, payload: res})
        })
  };

export const addComment = (newComment : ICommentCreate) =>
  (dispatch: Dispatch) => {
    commentApi.create(newComment)
        .then((res) => {
          dispatch({type: ForumActionTypes.ADD_NEW_COMMENT, payload: res})
        })
  }
