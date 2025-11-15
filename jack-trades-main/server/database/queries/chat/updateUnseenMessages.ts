import { Chat } from '../../../models';

const updateUnseenMessagesQuery = (
  receiver_id: number,
  sender_id: number,

) => Chat.update(

  { seen: true },
  {
    where: {
      receiver_id,
      sender_id,
      seen: false,
    },
  },

);

export default updateUnseenMessagesQuery;
