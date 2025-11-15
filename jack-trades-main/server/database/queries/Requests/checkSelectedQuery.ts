import { Product } from '../../../models';

const checkSelectedProductQuery = (ids:number[], user_id:number) => Product.findAll({
  where: {
    user_id,
    id: ids,
  },

});
export default checkSelectedProductQuery;
