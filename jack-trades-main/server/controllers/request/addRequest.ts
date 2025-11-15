/* eslint-disable @typescript-eslint/naming-convention */
import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces';
import { validateAddRequest } from '../../validation';
import {
  addRequestQuery, getProductDetailsQuery, getRequestQuery, checkSelectedProductQuery,
} from '../../database/queries';
import { CustomError } from '../../helpers';

const addRequests = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const senderId = req.user.id;
    // validate inputs
    const data = await validateAddRequest.validateAsync({ ...req.body, senderId });

    // validate if the item already requested
    const queryOutput = await getRequestQuery({
      sender_id: data.senderId, product_id: data.productId,
    });
    if (queryOutput) throw new CustomError(400, 'You already requested this item');
    // validate if the product id is valid

    const queryResult = await getProductDetailsQuery(data.productId);
    if (!queryResult) throw new CustomError(400, 'Please request a valid product');

    const { user_id, type } = queryResult;
    // validate if the user requests his own item
    if (user_id === senderId) throw new CustomError(400, "You can't request your items");
    // if exchange >> check if the user really has these products

    if (type === 'exchange') {
      if (!data.products || !data.products.length) throw new CustomError(400, 'Please add products to exchange');
      const isProductOwner = await checkSelectedProductQuery(data.products, senderId);
      if (isProductOwner.length !== data.products.length) {
        throw new CustomError(400, 'Please check your selected product');
      }
    }

    await addRequestQuery({
      sender_id: data.senderId,
      receiver_id: user_id,
      product_id: data.productId,
      type: type === 'exchange',
      products: data.products || null,
    });
    res.status(201).json({ message: 'request sent successfully' });
  } catch (error) {
    next(error);
  }
};

export default addRequests;
