import express from 'express'
import setupRoutes from './routes'
import middlewares from './middlewares'

const app = express()
middlewares(app)

setupRoutes(app)

export default app
