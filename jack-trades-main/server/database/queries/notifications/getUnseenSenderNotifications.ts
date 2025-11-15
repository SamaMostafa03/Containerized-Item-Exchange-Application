/* eslint-disable @typescript-eslint/indent */
import { Op } from 'sequelize';
import { Request } from '../../../models';

const getUnseenSenderNotificationsQuery = (sender_id: number) => Request.findAll({
    attributes: [
        'id',
    ],
    paranoid: false,
    where: {
        sender_id,
        receiver_approval: {
            [Op.ne]: null,
        },
        sender_seen: false,
    },
});
export default getUnseenSenderNotificationsQuery;
