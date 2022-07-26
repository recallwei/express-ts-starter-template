import express, { Router, Request, Response, NextFunction } from "express";
import { dbPool } from "../../../db/index";

const router: Router = express.Router();

router.get("/", async (request: Request, response: Response) => {
  try {
    const { rows } = await dbPool.query(
      "SELECT * FROM docs.menus ORDER BY index"
    );
    response.status(200).json(rows);
  } catch (err) {
    console.log(err);
  }
});

export default router;
