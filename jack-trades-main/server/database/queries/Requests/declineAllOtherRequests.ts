import { Op } from 'sequelize';
import { Request } from '../../../models';

const declineAllOtherRequests = (id:number, product_id:number) => Request.update({
  status: 'fail',
  receiver_approval: false,
}, {
  where: {
    product_id,
    id: {
      [Op.ne]: id,
    },
  },
});
export default declineAllOtherRequests;
