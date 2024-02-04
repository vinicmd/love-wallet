import { Router, Express } from 'express'
import { createUser } from '../controller/user/create-user'
import { showUser } from '../controller/user/show-user'
export const router = Router()

export default (app: Express): void => {
  const router = Router()

  router.get('/', (_req, res) => res.status(200).json({ message: 'alive' }))

  router.post('/user', createUser)

  router.get('/user/:userId', showUser)

  router.get('*', (_req, res) => res.sendStatus(404))

  app.use(router)
}
