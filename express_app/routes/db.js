import logger from '../logger.js';
import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res, next) => {
  const users = await prisma.user.findMany();
  logger.info({}, 'users fetched');
  logger.debug({ users: users }, 'users');

  const data = {
    title: 'Prisma',
    message: 'List of the Users table',
    data: users,
  };
  logger.info({}, 'data created');
  logger.debug({ data: data }, 'data');

  res.render('db', data);
  logger.info({}, 'render completed');
});

export default router;
