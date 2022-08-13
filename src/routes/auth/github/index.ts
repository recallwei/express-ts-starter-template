import express, { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router: Router = express.Router();

const POST_GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GET_GITHUB_USER_URL = "https://api.github.com/user";

export interface UserInfo {
  id: number | null;
  name: string | null;
  avatarUrl: string | null;
  biography: string | null;
  email: string | null;
  location: string | null;
}

/**
 * POST /auth/github
 * @summary Auth
 * @tags Auth
 * @return {object} 200 - success response - application/json
 */
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const requestToken = request.query.code;
      if (!requestToken) {
        response.status(401).json("Authenticate failed: No code.");
        return;
      }
      const tokenResponse = await axios({
        method: "POST",
        url:
          POST_GITHUB_TOKEN_URL +
          `?client_id=${process.env.GITHUB_CLIENT_ID}&` +
          `client_secret=${process.env.GITHUB_CLIENT_SECRET}&` +
          `code=${requestToken}`,
        headers: {
          accept: "application/json;charset=utf-8'",
        },
      });
      if (!tokenResponse.data.access_token) {
        response.status(401).json("Authenticate failed: No token.");
        return;
      }
      const user = await axios({
        method: "GET",
        url: GET_GITHUB_USER_URL,
        headers: {
          accept: "application/json",
          Authorization: `token ${tokenResponse.data.access_token}`,
        },
      });
      const userInfo: UserInfo | null = user.data
        ? {
            id: user.data.id,
            name: user.data.name ?? user.data.login,
            avatarUrl: user.data.avatar_url,
            biography: user.data.bio,
            email: user.data.email,
            location: user.data.location,
          }
        : null;
      response.status(200).json({
        token: tokenResponse.data.access_token,
        user: userInfo,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
