import { Request, Response } from 'express'
import { badRequest, notFound } from '../../helper/http'
import { MissingParamError } from '../../errors/missing-param-error'
import { isValidObjectId } from 'mongoose'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { dbDeleteUser } from '../../db/usecase/user/exclude-user'
import { checkUserExists } from '../../db/usecase/helpers/check-exist-user'

export const deleteUser = async (req: Request, res: Response) => {
  try {
    if (!req.params.userId) {
      return badRequest(res, MissingParamError('userId'))
    }

    const { userId } = req.params

    if (!isValidObjectId(userId)) {
      return badRequest(res, InvalidParamError('userId'))
    }

    const user = await checkUserExists(userId)

    if (!user) {
      return notFound(res)
    }

    await dbDeleteUser(userId)

    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
  }
}
