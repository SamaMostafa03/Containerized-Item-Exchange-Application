import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces';
import { deleteRequestQuery } from '../../database/queries';
import { CustomError } from '../../helpers';

const deleteRequest = async (req : IRequestPayload, res : Response, next:NextFunction) => {
  try {
    const { requestId } = req.params;
    const { id } = req.user;
    if (!(Number(requestId) > 0)) throw new CustomError(401, 'Bad Request');

    const queryResult = await deleteRequestQuery((+requestId), id);
    if (!queryResult) throw new CustomError(400, 'Please check your selected request again');

    res.json('request canceled successfully');
  } catch (error) {
    next(error);
  }
};

export default deleteRequest;
