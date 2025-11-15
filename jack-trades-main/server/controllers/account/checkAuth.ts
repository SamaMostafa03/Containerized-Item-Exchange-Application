import { Response, NextFunction } from 'express';
import { IRequestPayload, IUserPayload } from '../../interfaces';
import { getNameQuery } from '../../database/queries';
import { verifyToken } from '../../helpers';

const checkAuth = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  try {
    if (token) {
      const payload: IUserPayload = await verifyToken(token);

      const { id } = payload;
      const {
        first_name: firstName, last_name: lastName, image: userImage,
      } = await getNameQuery(id);

      res.json({
        user: {
          id, lastName, firstName, userImage,
        },
      });
    } else res.json({ user: null });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') res.json({ user: null });
    else next(error);
  }
};

export default checkAuth;
