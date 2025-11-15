import { Request } from '../../../models';

import { IRequest } from '../../../interfaces';

const addRequestQuery = ({
  product_id, sender_id, receiver_id, products, type,
}:IRequest) => Request.create({
  sender_id,
  receiver_id,
  product_id,
  products,
  is_exchangable: type,
});

export default addRequestQuery;
