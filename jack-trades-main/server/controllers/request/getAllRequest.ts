import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces';
import { getAllRequestsQuery } from '../../database/queries';

const getAllRequest = async (req : IRequestPayload, res : Response, next:NextFunction) => {
  try {
    const { id } = req.user;
    const { offset } = req.query;

    const allRequests = await getAllRequestsQuery(id, +offset || 0);

    res.json(allRequests);
  } catch (error) {
    next(error);
  }
};

export default getAllRequest;
