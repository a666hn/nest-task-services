export interface IUserPayload<T> {
  token?: string;
  refreshToken?: string;
  user: T;
}