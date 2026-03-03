import logger from '../logger.js';
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
    title: 'Table',
    data: db,
  };
  logger.info({}, 'data created');
  logger.debug({ data: data }, 'data');

  res.render('table', data);
  logger.info({}, 'render completed');
});

export default router;
