import { Request, Response, NextFunction } from 'express';
import { getFeedbackQuery } from '../../database/queries';

const getFeedback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbacks = await getFeedbackQuery();

    res.send({ feedbacks });
  } catch (error) {
    next(error);
  }
};

export default getFeedback;
