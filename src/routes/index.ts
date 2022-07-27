import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

/**
 * GET /
 * @summary Home
 * @tags Home
 * @return {object} 200 - OK
 */
router.get("/", function (request: Request, response: Response) {
  response.render("index", { title: "Wiki API" });
});

export default router;
