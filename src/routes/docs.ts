import express, { Router, Request, Response, NextFunction } from "express";
const router: Router = express.Router();

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.get(
  "/category",
  function (req: Request, res: Response, next: NextFunction) {
    res.send(["123", "234"]);
  }
);

export default router;
