import {IForumState} from 'Interface/IRootState';
import {Action} from 'redux';
import {ForumActionTypes} from '../actionCreators/forum'
// import {ITopic} from 'Interface/ITopic';
// import {IComment} from 'Interface/IComment';

const defaultState: IForumState = {
  topic: [],
  comment: {},
  topicComment: {},
};

interface IActionType extends Action {
  // payload: IForumState | ITopic | IComment;
  payload: any;
}

export function forumReducer(
    state = defaultState,
    action : IActionType
) : IForumState {
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
      const comment = action.payload;
      const newState = {...state};
      newState.comment[comment.id] = comment;
      newState.topicComment[comment.topicId].push(comment);
      return {...newState};
    }
    default:
      return state;
  }
}
