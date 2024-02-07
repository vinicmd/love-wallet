import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

import { dbGetUser } from '../../db/usecase/user/get-user'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, notFound } from '../../helper/http'

export const showUser = async (req: Request, res: Response) => {
  try {
    if (!req.params.userId) {
      badRequest(res, MissingParamError('userId'))
    }
    const userId = String(req.params.userId)

    if (!isValidObjectId(userId)) {
      return badRequest(res, InvalidParamError('userId'))
    }

    const user = await dbGetUser('_id', userId)

    if (!user) {
      return notFound(res)
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
  }
}
