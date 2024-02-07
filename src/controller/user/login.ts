import { Request, Response } from 'express'

import { dbGetUser } from '../../db/usecase/user/get-user'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { comparePassword } from '../../helper/check-password'
import { createJWTToken } from '../../helper/create-jwt-token'
import { badRequest, notFound } from '../../helper/http'
import { isValidEmail } from '../../helper/is-valid-email'

export const login = async (req: Request, res: Response) => {
  try {
    const requiredFields = ['email', 'password']

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return badRequest(res, MissingParamError(field))
      }
    }

    const email = String(req.body.email)
    const password = String(req.body.password)

    if (!isValidEmail(email)) {
      return badRequest(res, InvalidParamError('email'))
    }

    const user = await dbGetUser('email', email)

    if (!user) return notFound(res)

    const { _id, password: hashedPassword } = user

    const isValid = await comparePassword(password, hashedPassword)

    if (!isValid) return notFound(res)

    const token = createJWTToken(_id)

    return res.set('Authorization', token).sendStatus(204)
  } catch (error) {
    console.error(error)
  }
}
