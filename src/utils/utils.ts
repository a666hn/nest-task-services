import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as b from 'bcrypt';

export const SetPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new BadRequestException('Password tidak boleh kosong');
  }
  
  let hash: string = "";
  const SALT = await b.genSalt();

  hash = await b.hash(password, SALT);

  return hash;
};

export const ComparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
  let isMatch: boolean

  if (!password) {
    throw new BadRequestException(`Please input the password`);
  }

  if (!hashPassword) {
    throw new NotFoundException(`User not found`);
  }

  isMatch = await b.compare(password, hashPassword);

  return isMatch;
}