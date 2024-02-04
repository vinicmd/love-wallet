import { Response } from 'express'

export const badRequest = (response: Response, error: string) => {
  console.error(error)
  return response.sendStatus(400)
}
