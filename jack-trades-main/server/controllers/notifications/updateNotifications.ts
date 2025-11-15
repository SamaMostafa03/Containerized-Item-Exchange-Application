/* eslint-disable @typescript-eslint/indent */
import { Response, NextFunction } from 'express';
import { IRequestPayload } from '../../interfaces';
import {
    updateReceiverNotifications,
    updateSenderNotifications,
} from '../../database/queries';

const updateNotifications = async (req: IRequestPayload, res: Response, next: NextFunction) => {
    try {
        const { sent, received } = req.body;
        if (sent.length || received.length) {
            const [updateReceiver] = await updateReceiverNotifications(received);
            const [updateSender] = await updateSenderNotifications(sent);

            if (updateReceiver || updateSender) res.json({ message: 'request updated' });
        } else {
            res.status(400).json({ message: 'please provide an array of ids' });
        }
    } catch (error) {
        next(error);
    }
};

export default updateNotifications;
