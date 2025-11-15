import { User } from '../../../models';

const getNameQuery = (id: number) => User.findOne({
  attributes: ['first_name', 'last_name', 'image'],
  where: {
    id,
  },
});

export default getNameQuery;
