import {Dispatch} from 'redux';
import {forumApi} from 'Api/forumApi';
// import {topicApi} from 'Api/topicApi';
// import {commentApi} from 'Api/commentApi';

export enum ForumActionTypes {
  GET_STATE= 'GET_STATE',
  ADD_TOPIC= 'ADD_TOPIC',
}

export const getForumState = () =>
  (dispatch: Dispatch) => {
    return forumApi.getState().then((response) => {
      dispatch({type: ForumActionTypes.GET_STATE, payload: response});
    }).catch(() => {
      console.log('getForumState bad request')
    })
  };
