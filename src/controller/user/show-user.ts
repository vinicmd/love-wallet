import { Request, Response } from 'express'
import { badRequest } from '../../helper/http'
import { MissingParamError } from '../../errors/missing-param-error'
import { dbGetUser } from '../../db/usecase/user/get-user'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { checkUserId } from '../../db/usecase/helpers/check-user'

export const showUser = async (req: Request, res: Response) => {
  try {
    if (!req.params.userId) {
      badRequest(res, MissingParamError('userId'))
    }
    const { userId } = req.params

    const validUserId = await checkUserId(userId)
    if (!validUserId) {
      return badRequest(res, InvalidParamError('userId'))
    }

    const user = await dbGetUser(userId)

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
  }
}
