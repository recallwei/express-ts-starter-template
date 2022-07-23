import express, { Router, Request, Response, NextFunction } from "express";
const router: Router = express.Router();

/**
 * GET /
 * @summary Home
 * @tags Home
 * @return {object} 200 - OK
 */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("index", { title: "Express" });
});

export default router;
