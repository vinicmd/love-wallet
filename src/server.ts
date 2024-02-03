import express from 'express'
import { envConfig } from './utils/env-configs'
import { router } from './routes'

const app = express()

const { port } = envConfig
app.use(router)

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})
