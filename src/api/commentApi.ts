import ServerApi from './serverApi';
import {IComment} from 'Interface/IComment';

const COMMENT_PATH = '/comment/';

// enum CommentSubpath {};

class CommentApi {
  public create(comment : IComment) {
    return ServerApi.post(COMMENT_PATH, comment)
        .then((res) => res.json());
  }
}

export const commentApi = new CommentApi();
