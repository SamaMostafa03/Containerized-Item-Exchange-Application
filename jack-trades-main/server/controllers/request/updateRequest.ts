import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces';
import {
  updateRequestQuery,
  declineAllOtherRequests, checkRequestQuery,
  deleteSuccessRequestQuery, deleteExchangedProducts, deleteProductFromAllWishList,
} from '../../database/queries';
import { updateRequestValidation } from '../../validation';
import { CustomError } from '../../helpers';

const updateRequest = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const { requestId } = req.params;
    const { receiverApproval, productId } = req.body;

    if (!(Number(requestId) > 0)) throw new CustomError(401, 'Bad Request');
    await updateRequestValidation.validateAsync({ receiverApproval });

    // check if the request still valid and for the current user
    const queryResult = await checkRequestQuery(+requestId, +userId);
    if (!queryResult) throw new CustomError(400, 'This request does\'nt exist anymore');
    if (!receiverApproval) {
      await updateRequestQuery(+requestId, false, null, 'fail');
      res.json('You decline the request');
      return;
    }
    if (!queryResult.is_exchangable) {
      updateRequestQuery(+requestId, true, null, 'success');
    } else {
      if (!queryResult.products.includes(productId)) throw new CustomError(400, 'Choose one of the offered products');
      await updateRequestQuery(+requestId, true, productId, 'success');
    }

    await declineAllOtherRequests(+requestId, (+queryResult.product_id));
    await deleteSuccessRequestQuery(+requestId, userId);
    await deleteProductFromAllWishList([+productId, queryResult.product_id]);
    await deleteExchangedProducts([productId, queryResult.product_id]);
    res.json('Operation done successfully');
  } catch (error) {
    next(error);
  }
};

export default updateRequest;
