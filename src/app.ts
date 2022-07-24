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
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log(err);
  // res.render("error");
});

export default app;
