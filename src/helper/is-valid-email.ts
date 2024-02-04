import * as EmailValidator from 'email-validator'

export const isValidEmail = (email: string): boolean => {
  return EmailValidator.validate(email)
}
