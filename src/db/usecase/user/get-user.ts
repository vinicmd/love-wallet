import { User } from '../../models/User'

export const dbGetUser = async (userId: string) => {
  const user = await User.findOne({ _id: userId })
  return user
}
