import { Product } from '../../../models';

const updateProductQuery = ({ id, title, description }, user_id: number) => Product.update({
  title,
  description,
}, {
  where: {
    id,
    user_id,
    deletedAt: null,
  },
});

export default updateProductQuery;
