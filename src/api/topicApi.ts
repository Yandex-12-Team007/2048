import ServerApi from './serverApi';
import {ITopic} from 'Interface/ITopic';

const TOPIC_PATH = '/topic/';

// enum TopicSubpath {};

class TopicApi {
  public create(topic : ITopic) {
    return ServerApi.post(TOPIC_PATH, topic)
        .then((res) => res.json());
  }

  public getAll() {
    return ServerApi.get(TOPIC_PATH)
        .then((res) => res.json());
  }
}

export const topicApi = new TopicApi();
