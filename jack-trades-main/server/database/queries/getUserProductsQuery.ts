/* eslint-disable max-len */
import { Product } from '../../models';

const getUserProductsQuery = async (id: number, offset: number, limit: number) => Product.findAndCountAll({
  where: { user_id: id }, order: [['id', 'ASC']], offset, limit,
});

export default getUserProductsQuery;
