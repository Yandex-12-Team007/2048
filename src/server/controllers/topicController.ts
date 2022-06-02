import {Topic} from 'server/models/model';

class TopicController {
  async create(req, res) {
    const {params} = req.body;
    const comment = await Topic.create({params})
    return res.json(comment)
  }

  async getAll(req, res) {

  }
}

export default new TopicController();
