import { Request, Response } from 'express'

import { emailAlreadyRegistered } from '../../db/usecase/helpers/email-already-registered'
import { dbAddUser } from '../../db/usecase/user/add-user'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helper/http'
import { isValidEmail } from '../../helper/is-valid-email'

export const createUser = async (req: Request, res: Response) => {
  try {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return badRequest(res, MissingParamError(field))
      }
    }

    const { name, email, password, passwordConfirmation } = req.body

    if (password !== passwordConfirmation) {
      return badRequest(res, InvalidParamError('password'))
    }

    if (!isValidEmail(email as string)) {
      return badRequest(res, InvalidParamError('email'))
    }

    if (await emailAlreadyRegistered(email as string)) {
      return badRequest(res, InvalidParamError('email'))
    }

    const user = await dbAddUser({
      name,
      email,
      password
    })

    return res.status(201).json(user)
  } catch (error: unknown) {
    console.error(error)
    res.sendStatus(500)
  }
}
