import { Request, Response } from 'express'

import { User } from '../../db/models/User'
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

    const { email, password } = req.body

    if (!isValidEmail(email as string)) {
      return badRequest(res, InvalidParamError('email'))
    }

    const user = await User.findOne({ email })

    if (!user) return notFound(res)

    const { _id, password: hashedPassword } = user

    const isValid = await comparePassword(password as string, hashedPassword)

    if (!isValid) return notFound(res)

    const token = createJWTToken(_id)

    return res.set('Authorization', token).sendStatus(204)
  } catch (error) {
    console.error(error)
  }
}
