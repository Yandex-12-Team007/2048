import {Topic} from '../models/model';
import {ITopic} from 'Interface/ITopic';

class TopicController {
  async create(req, res) {
    const topic = req.body;
    const createdTopic = await Topic.create(topic);
    return res.json(createdTopic);
  }

  async getAll(req, res) {
    const topics = await Topic.findAll();
    return res.json(topics);
  }

  async update(req, res) {
    const topic : ITopic = req.body;
    const findTopic = await Topic.findOne({where: {id: topic.id}});
    // TODO: Тут надо отдать типовую ошибку, думаю будет midleware
    if (!findTopic) {
      return res.statusCode(400).json({error: `can't find topic`});
    }
    const updateTopic = await findTopic.update(topic);
    return res.json(updateTopic);
  }

  async delete(req, res) {
    const {id} : {id : number} = req.body;
    const deleteTopic = await Topic.destroy({where: {id: id}});
    return res.json({status: 0, delete: deleteTopic});
  }
}

export default new TopicController();
