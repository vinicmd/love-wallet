import type { Express } from 'express'

import { bodyParser } from '../utils/middlewares/body-parser'
import { contentType } from '../utils/middlewares/content-type'
import { cors } from '../utils/middlewares/cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
