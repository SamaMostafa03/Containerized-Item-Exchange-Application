import { Response, NextFunction } from 'express';
import { deleteProductQuery } from '../../database/queries';
import { CustomError } from '../../helpers';
import { IRequestPayload } from '../../interfaces/IRequestPayload';

const deleteProduct = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    if (!(Number(productId) > 0)) throw new CustomError(400, 'Bad Request');

    const userId = req.user.id;
    const deleted = await deleteProductQuery(productId, userId);

    if (deleted) res.send({ message: 'Product deleted successfully' });
    else throw new CustomError(400, 'Bad Request');
  } catch (error) {
    next(error);
  }
};

export default deleteProduct;
