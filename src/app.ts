import bodyParser from 'body-parser'
import chalk from 'chalk'
import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import fs from 'fs'
import createError from 'http-errors'
import logger from 'morgan'
import morgan from 'morgan'
import path from 'path'

import routes from '@/routes'

import { GlobalFileStorageConfig } from './shared'

const App: Express = express()

App.use(logger('dev'))
App.use(express.json())
App.use(express.urlencoded({ extended: true }))
App.use(morgan('tiny'))
App.use(bodyParser.json())
App.use(bodyParser.urlencoded({ extended: true }))

// Static files setup
App.use('/static', express.static(path.join(__dirname, '@/static')))

// Create file storage folder if not exists
const storageFolder = GlobalFileStorageConfig.FILE_STORAGE_PATH
try {
  fs.accessSync(storageFolder)
} catch (e) {
  fs.mkdirSync(storageFolder, { recursive: true })
  console.log(chalk.green('[File Storage] File storage folder created.'))
}

// Init routes
routes.forEach((route) => {
  App.use(route.path, route.router)
})

// Catch 404 error
App.use((error: any, request: Request, response: Response, next: NextFunction) => {
  next(createError(404))
})

// Error handler
App.use((error: any, request: Request, response: Response) => {
  response.render('error')
})

export default App
