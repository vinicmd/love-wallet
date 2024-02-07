import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

import { envConfig } from '../utils/env-configs'

export const createJWTToken = (id: Types.ObjectId): string => {
  const token = jwt.sign({ id }, envConfig.secret, {
    expiresIn: '60d'
  })
  return token
}
