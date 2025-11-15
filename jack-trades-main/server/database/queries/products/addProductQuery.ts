/* eslint-disable @typescript-eslint/indent */
import { Product } from '../../../models';
import { INewProduct } from '../../../interfaces';

const addProductQuery = ({
    title, description, gallery, type, category_id, user_id,
}: INewProduct) => Product.create({
    title, description, gallery, type, category_id, user_id,
});

export default addProductQuery;
