import { isValidObjectId } from 'mongoose'
import { User } from '../../models/User'

export const checkUserId = async (userId: string) => {
  const validObjectId = isValidObjectId(userId)
  if (!validObjectId) {
    return false
  }

  const validUser = await User.exists({ _id: userId })
  return !!validUser
}
