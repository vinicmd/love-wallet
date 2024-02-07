import { User } from '../../models/User'

export const dbGetUser = async (key: string, value: string) => {
  const user = await User.findOne({ key: value })
  return user
}
