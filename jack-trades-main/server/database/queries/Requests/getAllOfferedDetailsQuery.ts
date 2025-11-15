// import { Op } from 'sequelize';
import { Product } from '../../../models';

const getOfferedProductsDetailsQuery = (id: number[]) => Product.findAll({
  attributes: ['id', 'title', 'type', 'description', 'gallery'],
  where: {
    id,
  },

});

export default getOfferedProductsDetailsQuery;
