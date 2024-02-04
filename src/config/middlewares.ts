import type { Express } from 'express'
import { bodyParser } from '../utils/middlewares/body-parser'
import { cors } from '../utils/middlewares/cors'
import { contentType } from '../utils/middlewares/content-type'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
