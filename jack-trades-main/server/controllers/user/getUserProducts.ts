import { Request, Response, NextFunction } from 'express';
import { getUserProductsQuery } from '../../database/queries';
import { CustomError } from '../../helpers';

const getUserProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { offset, limit } = req.query;
  const { userId } = req.params;

  try {
    if (!(Number(userId) > 0)) throw new CustomError(400, 'Bad Request');
    const data = await getUserProductsQuery(+userId, +offset || 0, +limit || null);

    res.json(data);
  } catch (err) {
    next(err);
  }
};
export default getUserProducts;
