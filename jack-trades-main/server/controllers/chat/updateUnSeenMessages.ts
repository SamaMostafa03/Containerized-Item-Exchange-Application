import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces/IRequestPayload';
import { updateUnseenMessagesQuery } from '../../database/queries';

const updateUnseenMessages = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const { id: receiverId } = req.user;
    const { senderId } = req.params;
    const result = await updateUnseenMessagesQuery(receiverId, +senderId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default updateUnseenMessages;
