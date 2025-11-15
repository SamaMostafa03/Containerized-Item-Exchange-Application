import { Request } from '../../../models';

const getIsExchangeableQuery = (id:number) => Request.findOne({
  attributes: ['is_exchangable', 'product_id'],
  where: {
    id,
  },
});
export default getIsExchangeableQuery;
