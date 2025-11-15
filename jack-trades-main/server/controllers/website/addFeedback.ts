import { NextFunction, Response } from 'express';
import { addFeedbackQuery, getUsername } from '../../database/queries';
import { IRequestPayload } from '../../interfaces';

const addFeedback = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const username = await getUsername(req.user.id);
    await addFeedbackQuery({ ...req.body, username });

    res.send({ message: 'feedback inserted successfully!' });
  } catch (error) {
    next(error);
  }
};

export default addFeedback;
