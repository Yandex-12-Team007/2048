import {Router} from 'express';

import topicRouter from './topicRouter';
import commentRouter from './commentRouter';
import forumRouter from './forumRouter';

// @ts-ignore
const router = new Router()

router.use('/topic', topicRouter)
router.use('/comment', commentRouter)
router.use('/forum', forumRouter)

export default router;
