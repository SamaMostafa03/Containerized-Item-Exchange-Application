import { Request } from 'express';

export interface IUserPayload {
  id: number;
  email: string;
}
export interface IRequestPayload extends Request {
  user: IUserPayload
}
