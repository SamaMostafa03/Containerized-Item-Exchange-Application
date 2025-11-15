import { Category } from '../../../models';

const getCategoriesQuery = () => Category.findAll({
  attributes: ['id', 'name'],
});

export default getCategoriesQuery;
