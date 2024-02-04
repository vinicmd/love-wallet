import { envConfig } from './utils/env-configs'
import mongoose from 'mongoose'
import app from './config/app'

mongoose
  .connect(envConfig.mongoUrl)
  .then(() => {
    app.listen(envConfig.port, () => {
      console.log(`Server is running at port ${envConfig.port}`)
    })
  })
  .catch((error: unknown) => {
    console.error(error)
  })
