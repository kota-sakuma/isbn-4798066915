import logger from '../logger.js';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  if (req.session.comments === undefined) {
    req.session.comments = [];
  }
  logger.info({}, 'session created');

  const data = {
    title: 'Hello!',
    message: 'フォームを入力してください。',
    comments: req.session.comments,
  }
  logger.info({}, 'data created');
  logger.debug({ data: data }, 'data');

  res.render('hello', data);
  logger.info({}, 'render completed');
});

router.post('/', (req, res, next) => {
  req.session.comments.unshift(req.body.comment);
  logger.info({}, 'session updated');

  const data = {
    title: 'Hello!',
    message: 'コメントを追加しました。',
    comments: req.session.comments,
  };
  logger.info({}, 'data created');
  logger.debug({ data: data }, 'data');

  res.render('hello', data);
  logger.info({}, 'render completed');
});

export default router;
