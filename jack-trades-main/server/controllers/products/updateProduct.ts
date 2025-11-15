import { Response, NextFunction } from 'express';
import { updateProductQuery } from '../../database/queries';
import { validateUpdateData } from '../../validation';
import { CustomError } from '../../helpers';
import { IRequestPayload } from '../../interfaces/IRequestPayload';

const updateProduct = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const data = await validateUpdateData.validateAsync({
      id: +req.params.productId, ...req.body,
    });

    const userId = req.user.id;
    const [updated] = await updateProductQuery(data, userId);

    if (updated) res.json({ message: 'You updated your product successfully' });
    else throw new CustomError(400, 'Bad Request, id doesn\'t exist');
  } catch (error) {
    next(error);
  }
};

export default updateProduct;
