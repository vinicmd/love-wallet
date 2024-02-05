import { Express, Router } from 'express'

import { createUser } from '../controller/user/create-user'
import { deleteUser } from '../controller/user/delete-user'
import { editUser } from '../controller/user/edit-user'
import { login } from '../controller/user/login'
import { showUser } from '../controller/user/show-user'

export const router = Router()

export default (app: Express): void => {
  const router = Router()

  router.get('/', (_req, res) => res.status(200).json({ message: 'alive' }))

  router.post('/user', createUser)

  router.get('/user/:userId', showUser)

  router.put('/user/:userId', editUser)

  router.delete('/user/:userId', deleteUser)

  router.post('/login', login)

  router.get('*', (_req, res) => res.sendStatus(404))

  app.use(router)
}
