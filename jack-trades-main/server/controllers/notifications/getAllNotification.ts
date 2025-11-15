import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces';

import { getReceiverNotificationsQuery, getSenderNotificationsQuery } from '../../database/queries';

const getAllNotifications = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;

    const receiverNotifications = await getReceiverNotificationsQuery(id);

    const senderNotifications = await getSenderNotificationsQuery(id);

    const allNotifications = [...receiverNotifications, ...senderNotifications];

    const test = allNotifications.sort((a, b) => (
      new Date(b.date).valueOf() - new Date(a.date).valueOf()
    ));

    if (!test.length) {
      res.json({ data: 'There is no notifications yet' });
    } else {
      res.json(test);
    }
  } catch (error) {
    next(error);
  }
};

export default getAllNotifications;
