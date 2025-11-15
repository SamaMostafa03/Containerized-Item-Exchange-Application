import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces';

import { getAllWishlistItemsQuery } from '../../database/queries';

const getAllWishListItems = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  const { offset, limit } = req.query;
  const { id } = req.user;

  try {
    const data = await getAllWishlistItemsQuery(+id, +offset, +limit);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export default getAllWishListItems;
