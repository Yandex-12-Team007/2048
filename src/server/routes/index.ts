import {Router} from 'express';

import topicRouter from './topicRouter';
import commentRouter from './commentRouter';

// @ts-ignore
const router = new Router()

router.use('/topic', topicRouter)
router.use('/comment', commentRouter)

export default router;
