import { Request } from '../../../models';
// If the user cancel his request
const deleteRequestQuery = (id: number, sender_id: number) => Request.destroy({
  where: { id, sender_id },
  force: true,
});

const deleteSuccessRequestQuery = (id: number, receiver_id: number) => Request.destroy({
  where: { id, receiver_id },
});

export { deleteRequestQuery, deleteSuccessRequestQuery };
