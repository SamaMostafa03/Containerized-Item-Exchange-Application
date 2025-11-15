import { Favorite } from '../../../models';

const checkInWishlistQuery = (
  user_id : number,
  product_id : number,
) => Favorite.findOne({
  where: {
    user_id,
    product_id,
  },
});
export default checkInWishlistQuery;
