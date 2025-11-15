// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request, Response, NextFunction } from 'express';
import { getCategoriesQuery } from '../../database/queries/products';

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await getCategoriesQuery();
    res.send({ categories });
  } catch (error) {
    next(error);
  }
};

export default getCategories;
