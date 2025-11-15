import { Favorite } from '../../../models';

const deleteFromWishListQuery = (
  user_id: number,
  product_id: number,
) => Favorite.destroy({
  where: {
    user_id,
    product_id,
  },
});
export default deleteFromWishListQuery;
