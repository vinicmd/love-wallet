import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../../db/models/User'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { comparePassword } from '../../helper/check-password'
import { badRequest, notFound } from '../../helper/http'
import { isValidEmail } from '../../helper/is-valid-email'
import { envConfig } from '../../utils/env-configs'

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

    if (!user) {
      return notFound(res)
    }

    const { _id, password: hashedPassword } = user

    const isValid = await comparePassword(password as string, hashedPassword)
    if (!isValid) return notFound(res)

    const token = jwt.sign({ _id }, envConfig.secret, {
      expiresIn: '60d'
    })

    return res.status(200).json({ auth: true, token })
  } catch (error) {
    console.error(error)
  }
}
