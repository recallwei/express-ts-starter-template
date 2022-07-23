var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var docsRouter = require("./routes/docs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const swaggerJsdoc = require("express-jsdoc-swagger");
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
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
