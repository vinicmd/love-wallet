import { User } from '../../models/User'

export const emailAlreadyRegistered = async (email: string) => {
  const hasEmail = await User.exists({ email })
  return !!hasEmail
}
