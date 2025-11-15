import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces/IRequestPayload';
import { CustomError } from '../../helpers';
import { getUnSeenMessagesQuery } from '../../database/queries';

const getUnSeenMessages = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    if (!(Number(id) > 0)) throw new CustomError(400, 'Bad Request');
    const result = await getUnSeenMessagesQuery(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default getUnSeenMessages;
