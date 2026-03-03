import { Router } from 'express';

const router = Router();

const db = [
  { name: 'taro', mail: 'taro@yamada' },
  { name: 'hanako', mail: 'hanako@flower' },
  { name: 'sachiko', mail: 'sachiko@happy' },
  { name: 'jiro', mail: 'jiro@change' },
]

router.get('/', (req, res, next) => {
  const data = {
    title: 'Hello!',
    message: 'これは、サンプルで追加したページです。',
    id: '',
    pass: '',
    db: db,
  }
  res.render('hello', data);
});

router.post('/', (req, res, next) => {
  const data = {
    title: 'Hello!',
    message: req.body.id + 'さん (パスワード' + req.body.pass.length + '文字)',
    id: req.body.id,
    pass: req.body.pass,
    db: db,
  }
  res.render('hello', data);
});

export default router;
