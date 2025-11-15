import { Request, Response, NextFunction } from 'express';

import getProductQuery from '../../database/queries/products/getProduct';
import CustomError from '../../helpers/CustomError';

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  try {
    if (!(Number(productId) > 0)) {
      throw new CustomError(401, 'Bad Request');
    }
    const data = await getProductQuery(+productId);
    if (data !== null) {
      res.json(data);
    } else {
      throw new CustomError(404, 'This item doesn\'t exist anymore');
    }
  } catch (err) {
    next(err);
  }
};

export default getProduct;
