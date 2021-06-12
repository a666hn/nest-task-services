import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UsersEntity } from "src/infrastructure/databases/repositories/entities/users.entity";

export const GetUser = createParamDecorator((key, ctx: ExecutionContext): UsersEntity | string | boolean => {
  let result: UsersEntity | string | boolean
  const { user } = ctx.switchToHttp().getRequest();

  switch(key) {
    case 'id':
      result = user.id;
      break;
    case 'username':
      result = user.username;
      break;
    case 'email':
      result = user.email;
      break;
    case 'status':
      result = user.isActive;
      break;
    case 'fullName':
      result = `${user.firstName} ${user.lastName}`;
      break;
    case 'dob':
      result = user.dateOfBirth;
      break;
    default:
      if ('password' in user) {
        delete user['password']
      }

      result = user
      break;
  }

  return result;
})