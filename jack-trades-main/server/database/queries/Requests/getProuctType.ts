import { Product } from '../../../models';

const getProductDetailsQuery = (id:number) => Product.findOne({
  attributes: ['user_id', 'type'],
  where: {
    id,
  },

});

export default getProductDetailsQuery;
