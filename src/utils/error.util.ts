import { InternalServerErrorException, UnprocessableEntityException } from "@nestjs/common";
import { ERROR_23505, ERROR_42601 } from "src/globals/constant/errors.constant";

export const HandleTypeOrmError = (code: string, message: string) => {
  const Failed = 'Query Failed Error: ';
  const m = message || Failed;

  switch(code) {
    case ERROR_23505:
      throw new UnprocessableEntityException(m);
    case ERROR_42601:
      throw new InternalServerErrorException(Failed + m);
    default:
      console.log("Error: ", code);
  }
}