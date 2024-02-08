import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helper/http'
import { envConfig } from '../../utils/env-configs'

export const logout = async (req: Request, res: Response) => {
  try {
    if (!req.get('Authorization')) {
      return badRequest(res, MissingParamError('token'))
    }

    const token = String(req.get('Authorization'))

    const isValid = jwt.verify(token, envConfig.secret)
    console.log(isValid)

    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
  }
}
