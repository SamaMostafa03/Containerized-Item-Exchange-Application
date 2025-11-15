import { Product, Category } from '../../../models';

const getProductQuery = async (id: number) => Product.findByPk(
  id,
  {
    nest: false,
    raw: true,
    attributes: ['id', 'title', 'description', 'gallery', 'type', 'is_available', 'createdAt', 'user_id',
    ],
    include: [{
      model: Category,
      attributes: ['name'],
    }],
  },
);

export default getProductQuery;
