import {ForumState} from 'Interface/IRootState';
import {Action} from 'redux';
import {ForumActionTypes} from '../actionCreators/forum'

const defaultState: ForumState = {
  topic: [],
  comment: [],
  topicComment: [],
};

interface IActionType extends Action {
  payload: any;
}

export function forumReducer(state = defaultState, action : IActionType)
  : ForumState {
  switch (action.type) {
    case ForumActionTypes.GET_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
