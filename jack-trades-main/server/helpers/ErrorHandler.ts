import { Response, Request, NextFunction } from 'express';
import CustomError from './CustomError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandler = (error:CustomError, req: Request, res: Response, next: NextFunction) => {
  const { status, message } = error;

  if (error.name === 'ValidationError') return res.status(400).json({ message });
  res.status(status || 500).json({ message: status === 500 || typeof status === 'undefined' ? 'Internal Server Error, Please Try Again Later' : message });
};
export default ErrorHandler;
