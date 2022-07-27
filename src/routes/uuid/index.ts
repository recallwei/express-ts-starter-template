import express, { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const router: Router = express.Router();

/**
 * GET /uuid
 * @summary UUID
 * @tags UUID
 * @return {string} 200 - OK
 */
router.get("/", function (request: Request, response: Response) {
  response.status(200).send(uuidv4());
});

router.get("/view", function (request: Request, response: Response) {
  response.render("uuid/index", {
    uuid: uuidv4(),
    time: new Date().toISOString(),
  });
});

export default router;
