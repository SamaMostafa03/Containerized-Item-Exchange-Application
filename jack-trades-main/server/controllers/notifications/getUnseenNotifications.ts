/* eslint-disable @typescript-eslint/indent */
import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces';
import {
    getUnseenReceiverNotificationsQuery,
    getUnseenSenderNotificationsQuery,
} from '../../database/queries';

const getUnseenNotifications = async (req: IRequestPayload, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user;

        const received = (await getUnseenReceiverNotificationsQuery(id)).map((e) => e.id);
        const sent = (await getUnseenSenderNotificationsQuery(id)).map((e) => e.id);

        res.json({ received, sent });
    } catch (error) {
        next(error);
    }
};

export default getUnseenNotifications;
