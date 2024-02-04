import { Request, Response } from 'express'
import { badRequest } from '../../helper/http'
import { MissingParamError } from '../../errors/missing-param-error'
import { isValidObjectId } from 'mongoose'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { isValidEmail } from '../../helper/is-valid-email'
import { dbEditInfoUser } from '../../db/usecase/user/edit-info-user'

export const editUser = async (req: Request, res: Response) => {
  try {
    if (!req.params.userId) {
      return badRequest(res, MissingParamError('userId'))
    }

    const { userId } = req.params

    if (!isValidObjectId(userId)) {
      return badRequest(res, InvalidParamError('userId'))
    }

    const { name, email } = req.body

    if (!email && !name) {
      return badRequest(res, MissingParamError('email or name'))
    }

    if (!email && isValidEmail(email as string)) {
      return badRequest(res, InvalidParamError('email'))
    }

    const user = await dbEditInfoUser({ userId, name, email })

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
  }
}
