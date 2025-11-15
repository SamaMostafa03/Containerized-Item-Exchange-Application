import { verify } from 'jsonwebtoken';
import { IUserPayload } from '../interfaces';

const secretKey = process.env.SECRET_KEY;

export default (token: string): Promise <IUserPayload> => (
  new Promise((resolve, reject) => {
    verify(token, secretKey, (err: Error, data: IUserPayload) => {
      if (err) return reject(err);
      return resolve(data);
    });
  }));
