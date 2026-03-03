import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.render('hello', { title: 'Hello!', message: 'これは、サンプルで追加したページです。' });
});

export default router;
