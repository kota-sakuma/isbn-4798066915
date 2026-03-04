import logger from '../logger.js';
import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res, next) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;
