import { Chat } from '../../../models';
import User from '../../../models/users';

const getUnseenMessagesQuery = (
  receiver_id:number,
) => Chat.findAll({
  attributes: [],
  raw: true,
  nest: false,
  where: {
    receiver_id,
    seen: false,
  },

  include: [{
    model: User,
    attributes: ['id', 'first_name', 'last_name', 'image'],
    as: 'sender',
    required: true,
  },
  ],
  group: 'sender.id',
});

export default getUnseenMessagesQuery;
