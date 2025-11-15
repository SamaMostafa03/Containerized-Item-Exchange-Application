import { Response, NextFunction } from 'express';
import { verifyToken, CustomError } from '../helpers';
import { IUserPayload, IRequestPayload } from '../interfaces';

const authentication = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  try {
    if (token) {
      const payload: IUserPayload = await verifyToken(token);
      req.user = payload;
      next();
    } else throw new Error();
  } catch (error) {
    const err = new CustomError(401, 'Unauthorized');
    next(err);
  }
};

export default authentication;
