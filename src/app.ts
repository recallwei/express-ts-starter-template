import bodyParser from 'body-parser'
import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import swaggerJsdoc from 'express-jsdoc-swagger'
import createError from 'http-errors'
import logger from 'morgan'
import path from 'path'

import indexRouter from '@/routes'
import authGitHubRouter from '@/routes/auth/github'

const app: Express = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Static files setup
app.use('/public', express.static(path.join(__dirname, '@/public')))
app.use('/static', express.static(path.join(__dirname, '@/static')))

const options = {
  info: {
    title: 'Bruce World API',
    version: '1.0.0',
    description: 'An API which is used to support the wiki website.'
  },
  security: {
    bearerAuth: {
      type: 'apiKey',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description:
        "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below. Example: 'Bearer 123456abcdef'",
      name: 'Authorization',
      in: 'header'
    }
  },
  baseDir: __dirname,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api'
}

swaggerJsdoc(app)(options)

app.use('/', indexRouter)
app.use('/auth/github', authGitHubRouter)

// catch 404 error
app.use((error: any, request: Request, response: Response, next: NextFunction) => {
  next(createError(404))
})

// error handler
app.use((error: any, request: Request, response: Response) => {
  // set locals, only providing error in development
  console.log(response)
  response.locals.message = error.message
  response.locals.error = request.app.get('env') === 'development' ? error : {}
  // render the error page
  response.status(error.status || 500)
  response.render('error')
})

export default app
