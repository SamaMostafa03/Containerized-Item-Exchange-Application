import { Op } from 'sequelize';
import { Chat } from '../../../models';
import User from '../../../models/users';

const getAllMessagesQuery = (
  sender_id: number,
  receiver_id: number,
) => Chat.findAll({
  attributes: ['message', 'sender_id', 'receiver_id'],
  raw: true,
  nest: false,
  where: {
    [Op.or]: [{
      sender_id,
      receiver_id,
    },
    {
      sender_id: receiver_id,
      receiver_id: sender_id,
    }],
  },
  include: [{
    model: User,
    attributes: ['first_name', 'image'],
    as: 'sender',
  },
  {
    model: User,
    attributes: ['first_name', 'image'],
    as: 'receiver',
  },
  ],
  order: [['createdAt', 'ASC']],
});

export default getAllMessagesQuery;
