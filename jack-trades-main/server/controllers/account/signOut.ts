import { Request, Response } from 'express';

const signOut = (req : Request, res : Response) => {
  res.clearCookie('token').json({ message: 'Logged Out Successfully' });
};

export default signOut;
