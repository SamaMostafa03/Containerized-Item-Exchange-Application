import { Request, Response } from 'express';

const viewItemDetails = (req : Request, res : Response) => {
  res.send('Hello from view notifications');
};
// Review function name and file name Here !
export default viewItemDetails;
