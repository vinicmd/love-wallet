import { Router } from 'express'
import { createUser } from './controller/user/create-user'
export const router = Router()

router.get('/', (_req, res) => res.status(200).json({ message: 'alive' }))

router.post('/user', createUser)
