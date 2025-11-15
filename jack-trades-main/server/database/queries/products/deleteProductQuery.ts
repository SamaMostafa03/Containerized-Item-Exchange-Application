import { Product } from '../../../models';

const deleteProductQuery = async (id: string, user_id: number) => Product.destroy({
  where: {
    id,
    user_id,
    deletedAt: null,
  },
});

export default deleteProductQuery;
