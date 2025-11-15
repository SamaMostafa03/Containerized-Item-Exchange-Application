/* eslint-disable @typescript-eslint/indent */
import { Request } from '../../../models';

const updateSenderNotifications = (arr: number[]) => Request.update(
    {
        sender_seen: true,
    },
    {
        where: { id: arr },
        paranoid: false,
    },
);

export default updateSenderNotifications;
