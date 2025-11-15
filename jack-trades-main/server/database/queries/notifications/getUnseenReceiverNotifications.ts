/* eslint-disable @typescript-eslint/indent */
import { Request } from '../../../models';

const getUnseenReceiverNotificationsQuery = (receiver_id: number) => Request.findAll({
    attributes: [
        'id',
    ],
    raw: true,
    nest: false,
    paranoid: false,
    where: {
        receiver_id,
        receiver_seen: false,
    },
});
export default getUnseenReceiverNotificationsQuery;
