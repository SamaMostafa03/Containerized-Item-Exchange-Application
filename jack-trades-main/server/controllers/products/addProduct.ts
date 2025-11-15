import { Response, NextFunction } from 'express';
import { addProductQuery } from '../../database/queries';
import { validateNewProduct } from '../../validation';
import { IRequestPayload } from '../../interfaces/IRequestPayload';

const addProduct = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const data = await validateNewProduct.validateAsync(req.body);
    const product = await addProductQuery({ ...data, user_id: userId });

    if (product) res.status(201).json({ message: 'You successfully posted a product' });
  } catch (error) {
    next(error);
  }
};

export default addProduct;
