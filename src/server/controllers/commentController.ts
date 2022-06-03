import {Comment} from '../models/model';
import {IComment} from 'Interface/IComment';

class CommentController {
  async create(req, res) {
    const comment = req.body;
    const createdTopic = await Comment.create(comment)
    return res.json(createdTopic)
  }

  async getAll(req, res) {
    const comment = await Comment.findAll()
    return res.json(comment)
  }

  async getByTopicId(req, res) {
    const {topicId} = req.params
    const topicComments = await Comment.findAll(
        {
          where: {topicId: topicId},
        }
    );
    return res.json(topicComments)
  }

  async update(req, res) {
    const comment : IComment = req.body;
    const findTopic = await Comment.findOne({where: {id: comment.id}});
    // TODO: Тут надо отдать типовую ошибку, думаю будет midleware
    if (!findTopic) {
      return res.statusCode(400).json({error: `can't find topic`});
    }
    const updateTopic = await findTopic.update(comment);
    return res.json(updateTopic);
  }

  async delete(req, res) {
    const {id} : {id : number} = req.body;
    const deleteTopic = await Comment.destroy({where: {id: id}});
    return res.json({status: 0, delete: deleteTopic});
  }
}

export default new CommentController();
