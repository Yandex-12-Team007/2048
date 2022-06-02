import {Router} from 'express';

// @ts-ignore
const router = new Router()

router.get('/', () => console.log('get'));
router.post('/', () => console.log('post'));

export default router;
