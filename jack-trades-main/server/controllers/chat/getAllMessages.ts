import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces/IRequestPayload';
import { getAllMessagesQuery } from '../../database/queries';
import { CustomError } from '../../helpers';

const getAllMessages = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const { id: senderId } = req.user;
    const { receiverId } = req.params;
    if (!(Number(receiverId) > 0)) throw new CustomError(400, 'Bad Request');
    const result = await getAllMessagesQuery(senderId, +receiverId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default getAllMessages;
