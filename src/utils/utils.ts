import { BadRequestException } from '@nestjs/common';
import * as b from 'bcrypt';
import { SALT_ROUNDS } from 'src/globals/configs/hash.config';

export const setPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new BadRequestException('Password tidak boleh kosong');
  }
  
  let hash: string = "";

  hash = await b.hash(password, SALT_ROUNDS);

  return hash;
};