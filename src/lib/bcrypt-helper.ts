import bcrypt from 'bcryptjs';

const saltRounds = 11;

export const BcryptHelper = {
    hash: async (password: string) => bcrypt.hash(password, saltRounds),
    compare: async (password: string, hashedPassword: string) =>
      bcrypt.compare(password, hashedPassword)
};
