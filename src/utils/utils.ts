import { BadRequestException } from '@nestjs/common';
import * as b from 'bcrypt';

export const setPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new BadRequestException('Password tidak boleh kosong');
  }
  
  let hash: string = "";
  const SALT = await b.genSalt();

  hash = await b.hash(password, SALT);

  return hash;
};