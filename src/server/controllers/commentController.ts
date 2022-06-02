import {Comment} from 'server/models/model';

class CommentController {
  async create(req, res) {
    const {params} = req.body;
    const comment = await Comment.create({params})
    return res.json(comment)
  }

  async getAll(req, res) {

  }
}

export default new CommentController();
