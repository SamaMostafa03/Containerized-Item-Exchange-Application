import { Chat } from '../../../models';

const addMessageQuery = (sender_id:number, receiver_id:number, message:string) => Chat.create({
  sender_id,
  receiver_id,
  message,
}, {
  returning: true,
});

export default addMessageQuery;
