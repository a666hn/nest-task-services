import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import * as b from 'bcrypt';
import { SALT_ROUNDS } from 'src/globals/configs/hash.config';
import { ERROR_23505 } from 'src/globals/constant/errors.constant';

export const setPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new BadRequestException('Password tidak boleh kosong');
  }
  
  let hash: string = "";

  hash = await b.hash(password, SALT_ROUNDS);

  return hash;
};

export const getTypeormError = (code: string, message: string) => {
  if (code === ERROR_23505) {
    throw new UnprocessableEntityException(message);
  } else {
    console.log("Error Code", code);
  }
};