import { Op } from 'sequelize';
import { Request } from '../../../models';

interface IRequest {
  product_id:number,
  sender_id:number
}
const getRequestQuery = ({ product_id, sender_id }:IRequest) => Request.findOne({
  attributes: ['id'],
  where: {
    product_id,
    sender_id,
    status: {
      [Op.not]: 'fail',
    },
  },
});

export default getRequestQuery;
