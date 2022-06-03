import {Router} from 'express';
import CommentController from '../controllers/commentController';

// @ts-ignore
const router = new Router()

router.get('/', CommentController.getAll);
router.get('/:topicId', CommentController.getByTopicId);
router.post('/', CommentController.create);
router.put('/', CommentController.update);
router.delete('/', CommentController.delete);

export default router;
