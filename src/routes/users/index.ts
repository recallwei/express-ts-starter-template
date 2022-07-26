import express, { Router, Request, Response, NextFunction } from "express";
import pool from "../../pool";

const router: Router = express.Router();

router.get(
  "/",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function (request: Request, response: Response, nextFunction: NextFunction) {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
      console.log(error);
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }
);

export default router;
