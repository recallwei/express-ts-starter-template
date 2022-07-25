import express, { Express, Request, Response, NextFunction } from "express";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import swaggerJsdoc from "express-jsdoc-swagger";
import path from "path";

import indexRouter from "./routes/index";
import docsRouter from "./routes/docs";

const app: Express = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files setup
app.use("/public", express.static(path.join(__dirname, "../src/public")));
app.use("/static", express.static(path.join(__dirname, "../static")));

const options = {
  info: {
    title: "Bruce's Wiki API",
    version: "1.0.0",
    description: "An API which is used to support the wiki website.",
  },
  security: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "bearer JWT Token",
      name: "Authorization",
      in: "header",
    },
  },
  baseDir: __dirname,
  filesPattern: "./**/*.js",
  swaggerUIPath: "/api",
};

swaggerJsdoc(app)(options);

app.use("/", indexRouter);
app.use("/docs", docsRouter);

// catch 404 and forward to error handler
app.use(function (
  error: any,
  request: Request,
  response: Response,
  nextFunction: NextFunction
) {
  nextFunction(createError(404));
});

// error handler
app.use(function (
  error: any,
  request: Request,
  response: Response,
  nextFunction: NextFunction
) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};
  // render the error page
  response.status(error.status || 500);
  response.render("error");
});

export default app;
