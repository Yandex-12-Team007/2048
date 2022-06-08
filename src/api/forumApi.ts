import ServerApi from './serverApi';

const FORUM_PATH = '/forum/';

// enum TopicSubpath {};

class ForumApi {
  public getState() {
    return ServerApi.get(FORUM_PATH)
        .then((res) => res.json());
  }
}

export const forumApi = new ForumApi();

