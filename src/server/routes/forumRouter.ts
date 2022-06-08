import {Router} from 'express';
import ForumController from '../controllers/forumController';

// @ts-ignore
const router = new Router()

router.get('/', ForumController.getTopicWithComments)

export default router;
