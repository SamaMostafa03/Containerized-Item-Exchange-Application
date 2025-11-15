import { User } from '../../../models';

const signinQuery = ({ email }) => User.findOne({
  where: {
    email,
  },
});

export default signinQuery;
