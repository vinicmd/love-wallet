import { Request, Response } from 'express'

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body)

    return res.sendStatus(200)
  } catch (error: unknown) {
    console.error(error)
  }
}
