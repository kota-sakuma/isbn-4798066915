import logger from "../logger.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client.ts";
import { Router } from "express";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const router = Router();

router.get("/", async (req, res, next) => {
  const users = await prisma.user.findMany();
  logger.info({}, "users fetched");
  logger.debug({ users: users }, "users");

  const data = {
    title: "Prisma",
    message: "List of the Users table",
    data: users,
  };
  logger.info({}, "data created");
  logger.debug({ data: data }, "data");

  res.render("db", data);
  logger.info({}, "render completed");
});

router.post("/", async (req, res, next) => {
  const { name, email, age } = req.body;
  const user = await prisma.user.create({
    data: { name: name, email: email, age: age },
  });
  logger.info({}, "user created");
  logger.debug({ user: user }, "user");

  res.redirect("/db");
  logger.info({}, "redirect completed");
});

export default router;
