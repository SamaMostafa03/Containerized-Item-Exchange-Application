/* eslint-disable @typescript-eslint/indent */
import { Product } from '../../../models';

const deleteExchangedProducts = async (id: string[]) => Product.destroy({
    where: {
        id,
    },
});

export default deleteExchangedProducts;
