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
    console.log("authorization code:", requestToken);
    if (!requestToken) {
      response.redirect(
        process.env.TASKWARD_BASE_URL ?? "http://localhost:5173/"
      );
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
    response.redirect(
      `${process.env.TASKWARD_BASE_URL}login?accessToken=${tokenResponse.data.access_token}`
    );
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
  } catch (err) {
    console.log(err);
    response.status(404).json("Server Error");
  }
});

export default router;
