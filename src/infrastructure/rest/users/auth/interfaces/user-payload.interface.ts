export interface IUserPayload<T> {
  token?: string;
  refreshToken?: string;
  user: T;
}

export interface IJwtPayload {
  uid: string;
  un: string;
  ue: string;
  us: boolean;
}