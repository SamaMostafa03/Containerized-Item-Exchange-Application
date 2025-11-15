import { Request } from '../../../models';

const updateRequestQuery = (
  id:number,
  receiver_approval:boolean,
  exchanged_id:number | null,
  status:'success' | 'fail',
) => Request.update({
  receiver_approval,
  exchanged_id,
  status,
}, {
  where: { id },
});

export default updateRequestQuery;
