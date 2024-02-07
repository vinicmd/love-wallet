import { Request, Response } from 'express'

import { dbGetUser } from '../../db/usecase/user/get-user'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { comparePassword } from '../../helper/check-password'
import { badRequest, notFound } from '../../helper/http'

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    if (!req.params.userId) {
      return badRequest(res, MissingParamError('userId'))
    }

    const { userId } = req.params

    const user = await dbGetUser(userId)

    if (!user) {
      return notFound(res)
    }

    const requiredFields = [
      'password',
      'newPassword',
      'newPasswordConfirmation'
    ]

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return badRequest(res, MissingParamError(field))
      }
    }

    const { password, newPassword, newPasswordConfirmation } = req.body

    if (newPassword !== newPasswordConfirmation) {
      return badRequest(res, InvalidParamError('password'))
    }

    const isValid = await comparePassword(password as string, user.password)

    if (!isValid) {
      return badRequest(res, 'The password is not valid')
    }
  } catch (error) {
    console.error(error)
  }
}
