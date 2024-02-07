import bcrypt from 'bcrypt'

export const encrypter = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10)
  return hash
}
