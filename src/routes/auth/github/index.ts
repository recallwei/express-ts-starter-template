import express, { Router, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router: Router = express.Router();

/**
 * POST /auth/github
 * @summary Auth
 * @tags Auth
 * @return {object} 200 - success response - application/json
 */
router.post("/", async (request: Request, response: Response) => {
  try {
    const requestToken = request.query.code;
    if (!requestToken) {
      response.sendStatus(401);
      return;
    }
    const tokenResponse = await axios({
      method: "POST",
      url:
        "https://github.com/login/oauth/access_token?" +
        `client_id=${process.env.GITHUB_CLIENT_ID}&` +
        `client_secret=${process.env.GITHUB_CLIENT_SECRET}&` +
        `code=${requestToken}&`,
      headers: {
        accept: "application/json",
      },
    });
    response.status(200).send(tokenResponse.data.access_token);
  } catch (err) {
    console.log(err);
    response.status(401).json("Authenticate failed.");
  }
});
// return;
// const accessToken = tokenResponse.data.access_token;
// console.log(`access token: ${accessToken}`);

// const result = await axios({
//   method: "GET",
//   url: `https://api.github.com/user`,
//   headers: {
//     accept: "application/json",
//     Authorization: `token ${accessToken}`,
//   },
// });
// console.log(result.data);

export default router;
