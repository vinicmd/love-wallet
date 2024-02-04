import { User } from '../../models/User'

interface EditInfo {
  userId: string
  email?: string
  name?: string
}

export const dbEditInfoUser = async ({ email, name, userId }: EditInfo) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { email, name },
    {
      new: true
    }
  )
}
