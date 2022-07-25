import express, { Router, Request, Response, NextFunction } from "express";
const router: Router = express.Router();

/**
 * GET /
 * @summary Home
 * @tags Home
 * @return {object} 200 - OK
 */
router.get(
  "/",
  function (request: Request, response: Response, nextFunction: NextFunction) {
    // res.send("Welcome to home!");
    response.render("index", { title: "Wiki API" });
  }
);

export default router;
