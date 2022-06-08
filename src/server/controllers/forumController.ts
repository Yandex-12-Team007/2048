import {Comment, Topic} from '../models/model';
import {IComment} from 'Interface/IComment';
import {ITopic} from 'Interface/ITopic';

class ForumController {
  /* getTopicWithComments
    Метод возвращает данные в супер удобном виде для работы )
    Плюсы - не надо будет каждый раз искать Сообщения / Сообщения для топика
    Минусы - при обновлении придется менять значения в 2-х местах
   */
  async getTopicWithComments(req, res) {
    const data = await Promise.all([
      Comment.findAll(),
      Topic.findAll(),
    ]);

    // @ts-ignore
    const [comment, topic] : [IComment[], ITopic[]] = data;

    const response = {
      topic: topic,
      comment: comment.reduce<Record<number, IComment>>((acc, el) => {
        if (el.id) {
          acc[el.id] = el;
        }
        return acc
      }, {}),
      topicComment: comment.reduce<Record<number, IComment[]>>((acc, el) => {
        if (!acc[el.topicId]) {
          acc[el.topicId] = [];
        }

        acc[el.topicId].push(el);

        return acc;
      }, {}),
    };
    // TODO: Hotfix для пустых тем
    topic.forEach((el) => {
      if (!response.topicComment[el.id]) {
        response.topicComment[el.id] = []
      }
    })

    return res.json(response);
  }
}

export default new ForumController();
