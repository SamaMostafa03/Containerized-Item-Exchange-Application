import { Op } from 'sequelize';
import { Request } from '../../../models';

const getAllOfferedProductsQuery = (id:number, user_id:number) => Request.findOne({
  attributes: ['products'],
  where: {
    id,
    [Op.or]: [
      { receiver_id: user_id }, {
        sender_id: user_id,
      },
    ],
  },
});

export default getAllOfferedProductsQuery;
