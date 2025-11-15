/* eslint-disable @typescript-eslint/indent */
import { Request } from '../../../models';

const updateReceiverNotifications = (arr: number[]) => Request.update(
    {
        receiver_seen: true,
    },

    {
        where: { id: arr },
        paranoid: false,
    },
);

export default updateReceiverNotifications;
