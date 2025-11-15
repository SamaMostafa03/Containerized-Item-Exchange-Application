import { Favorite } from '../../../models';

const deleteProductFromAllWishList = (
  productsId : number[],
) => Favorite.destroy({
  where: {
    product_id: productsId,
  },
});
export default deleteProductFromAllWishList;
