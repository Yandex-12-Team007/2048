import {Router} from 'express';
import TopicController from '../controllers/topicController';

// @ts-ignore
const router = new Router()

router.get('/', TopicController.getAll);
router.post('/', TopicController.create);
router.put('/', TopicController.update);
router.delete('/', TopicController.delete);

export default router;
