import { Favorite } from '../../../models';

const addToWishListQuery = async (user_id : number, product_id : number) => Favorite.create({
  user_id,
  product_id,
});

export default addToWishListQuery;
