import { Request, Response } from 'express';

const getUserWishList = (req : Request, res : Response) => {
  res.send('Hello from user wishlist');
};
export default getUserWishList;
