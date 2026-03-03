import logger from '../logger.js';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  const data = {
    title: 'Form',
    id: '',
    pass: '',
  };
  logger.info({}, 'data created');
  logger.debug({ data: data }, 'data');

  res.render('form', data);
  logger.info({}, 'render completed');
});

router.post('/', (req, res, next) => {
  const data = {
    title: 'Form',
    message: req.body.id + 'さん (パスワード' + req.body.pass.length + '文字)',
    id: req.body.id,
    pass: req.body.pass,
  };
  logger.info({}, 'data created');
  logger.debug({ data: data }, 'data');

  res.render('form', data);
  logger.info({}, 'render completed');
});

router.post('/ajax', (req, res, next) => {
  const result = {
    id: req.body.id,
    pass: req.body.pass,
    message: 'こんにちは、' + req.body.id + 'さん！'
  };
  res.send(result);
});

export default router;
