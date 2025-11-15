/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from '../../../models';
import Product from '../../../models/Product';

const getAllRequestsQuery = (sender_id:number, offset: number) => Request.findAndCountAll({
  attributes: ['id', 'status', 'receiver_approval', 'products', 'createdAt', 'receiver_id', 'product_id', 'exchanged_id'],
  raw: true,
  nest: false,
  where: {
    sender_id,
  },
  offset,
  limit: 3,
  include: {
    model: Product,
    as: 'product',
    attributes: ['title', 'gallery'],
  },

});

export default getAllRequestsQuery;
