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
    case ForumActionTypes.ADD_TOPIC: {
      const topic = action.payload;
      const newState = {...state};
      newState.topic.push(topic);
      newState.topicComment[topic.id] = [];
      return newState;
    }
    case ForumActionTypes.ADD_NEW_COMMENT: {
      console.log('ADD_NEW_COMMENT');
      const comment = action.payload;
      console.log(comment);
      const newState = {...state};
      newState.comment[comment.id] = comment;
      newState.topicComment[comment.topicId].push(comment);
      return {...newState};
    }
    default:
      return state;
  }
}
