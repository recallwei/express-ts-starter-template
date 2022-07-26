import express, { Router, Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import { client, config } from "../../db/index";

const router: Router = express.Router();

router.get(
  "/",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function (request: Request, response: Response, nextFunction: NextFunction) {
    // pool.query(
    //   "SELECT * FROM users ORDER BY id ASC",
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   (error: Error, results: QueryResult<any>) => {
    //     console.log(error);
    //     if (error) {
    //       throw error;
    //     }
    //     response.status(200).json(results.rows);
    //   }
    // );
    // pool.end();
    client.connect((err) => {
      if (err) throw err;
      else {
        console.log(`Running query to PostgreSQL server: ${config.host}`);
        const query = "SELECT * FROM public.user;";
        client
          .query(query)
          .then((res) => {
            const rows = res.rows;
            rows.map((row) => {
              console.log(`Read: ${JSON.stringify(row)}`);
            });
            response.status(200).json(rows);
            return rows;
            // process.exit();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    client.end();
  }
);

export default router;
