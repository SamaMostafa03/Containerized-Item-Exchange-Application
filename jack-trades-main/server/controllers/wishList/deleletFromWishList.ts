import { Response, NextFunction } from 'express';

import { IRequestPayload } from '../../interfaces';

import { checkInWishlistQuery, deleteFromWishListQuery } from '../../database/queries';
import { CustomError } from '../../helpers';

const deleteFromWishList = async (req : IRequestPayload, res : Response, next:NextFunction) => {
  const { productId } = req.params;
  const { id } = req.user;
  try {
    if (!(Number(productId) > 0)) throw new CustomError(400, 'Bad Request');
    const data = await checkInWishlistQuery(id, +(productId));

    if (data) {
      await deleteFromWishListQuery(id, +(productId));
      res.status(200).json({ message: 'You removed the product from the wishlist successfully' });
    } else {
      throw new CustomError(400, 'This item is already removed from your wishlist');
    }
  } catch (err) {
    next(err);
  }
};

export default deleteFromWishList;
