import { User } from '../../models/User'

export const checkUserExists = async (userId: string) => {
  const userExists = await User.exists({ _id: userId })
  return !!userExists
}
