import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import {
  getAllProductsQuery, getAllCategoriesQuery,
} from '../../database/queries/products';
import { TStrOrStrArr, Args } from '../../interfaces';

const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const limit = Number(req.query.limit) || 6;
    const offset = Number(req.query.offset) || 0;
    let category = req.query.category as string[];
    let type: TStrOrStrArr = req.query.type as TStrOrStrArr;
    let date = req.query.date as string;
    const search: TStrOrStrArr = req.query.q as TStrOrStrArr;
    const userId = req.query.userId as string;

    const categories = await getAllCategoriesQuery();

    if (!category) { category = categories.map((v: { id: number }) => String(v.id)); }

    if (type !== 'exchange' && type !== 'donation') {
      type = ['exchange', 'donation'];
    }
    if (date?.toLowerCase() === 'newst') {
      date = 'DESC';
    } else if (date?.toLowerCase() === 'oldest') {
      date = 'ASC';
    } else { date = 'DESC'; }
    const args: Args = { category_id: category, type };

    if (search) {
      args.title = search;
    }
    if (userId) {
      args.user_id = {
        [Op.ne]: userId,
      };
    }
    const products = await getAllProductsQuery({
      limit, offset, date, args,
    });
    res.json({
      totalPages: Math.ceil(products.count / +limit),
      products: products.rows,
      productsCount: products.count,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllProducts;
