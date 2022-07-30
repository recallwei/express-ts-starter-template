import express, { Router, Request, Response } from "express";
import { prisma } from "../../db";
import { type todo } from "@prisma/client";

const router: Router = express.Router();

/**
 * GET /todo
 * @summary Todo
 * @tags Todo
 * @return {object} 200 - success response - application/json
 */
router.get("/", async (request: Request, response: Response) => {
  const todoList: Array<todo> = await prisma.todo.findMany();
  response.status(200).json(todoList);
});

router.post("/", async (request: Request, response: Response) => {
  response.status(200).send("OK");
});

export default router;
