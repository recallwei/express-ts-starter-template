import express, { Router, Request, Response, NextFunction } from "express";
const router: Router = express.Router();

router.get(
  "/",
  function (request: Request, response: Response, nextFunction: NextFunction) {
    response.send("respond with a resource");
  }
);

router.get(
  "/category",
  function (request: Request, response: Response, nextFunction: NextFunction) {
    response.send(["123", "234"]);
  }
);

export default router;
