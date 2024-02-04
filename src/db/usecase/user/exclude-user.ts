import { User } from '../../models/User'

export const dbDeleteUser = async (userId: string) => {
  await User.deleteOne({ _id: userId })
}
