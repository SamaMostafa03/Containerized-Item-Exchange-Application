import { Product, Category } from '../../../models';
import { IArguments } from '../../../interfaces';

const getAllProductsQuery = ({
  limit, offset, date, args,
}: IArguments) => Product.findAndCountAll({
  limit,
  offset: offset * limit,
  where: { ...args },
  order: [
    ['createdAt', `${date}`],
  ],
  attributes: ['id', 'title', 'gallery'],
});

const getAllCategoriesQuery = () => Category.findAll({
  attributes: ['id', 'name'],
});

export {
  getAllProductsQuery, getAllCategoriesQuery,
};
