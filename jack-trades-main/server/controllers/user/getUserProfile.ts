import { NextFunction, Request, Response } from 'express';
import { getUserProfileQuery } from '../../database/queries';
import CustomError from '../../helpers/CustomError';

const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    if (!(Number(userId) > 0)) {
      throw new CustomError(400, 'Opss, Bad Request');
    }
    const response = await getUserProfileQuery(+userId);
    if (response != null) {
      res.json(response);
    } else {
      throw new CustomError(404, 'Opss, User Not Found');
    }
  } catch (error) {
    next(error);
  }
};
export default getUserProfile;
