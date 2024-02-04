import bcrypt from 'bcrypt'

export const encrypter = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 12)
  return hash
}
