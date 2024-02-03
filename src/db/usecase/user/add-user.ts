import { encrypter } from '../../../helper/encrypter'
import { DbUser } from '../../../protocols/user/db-user'
import { User } from '../../models/User'

export const dbAddUser = async ({
  email,
  name,
  password
}: DbUser): Promise<DbUser> => {
  const hashedPassword = encrypter(password)
  const user = await User.create({ email, name, password: hashedPassword })

  return user
}
