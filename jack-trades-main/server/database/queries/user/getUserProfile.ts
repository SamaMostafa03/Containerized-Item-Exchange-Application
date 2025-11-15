import { User } from '../../../models';

const getUserProfileQuery = (id: number) => User.findOne({
  where: { id },
  attributes: ['first_name', 'last_name', 'image', 'bio', 'email'],
});

export default getUserProfileQuery;
