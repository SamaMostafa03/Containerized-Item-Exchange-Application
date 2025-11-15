// import { Sequelize } from 'sequelize';
import { Favorite, Product } from '../../../models';
import sequelize from '../../connection';

const getAllWishlistItemsQuery = async (user_id: number, offset: number, limit: number) => Favorite
  .findAndCountAll({
    raw: true,
    attributes: [
      'id',
      'product_id',
      [sequelize.col('Product.title'), 'title'],
      [sequelize.col('Product.gallery'), 'gallery'],
      [sequelize.col('Product.description'), 'description'],
    ],
    include: {
      model: Product,
      attributes: [],
    },
    where: {
      user_id,
    },
    offset,
    limit,
  });

export default getAllWishlistItemsQuery;
