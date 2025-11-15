import { Op } from 'sequelize';
import { User } from '../../../models';

const checkEmailQuery = async (
  id:number,
  email:string,

) => User.findOne({
  attributes: ['email'],
  where: {
    email,
    id: { [Op.ne]: id },
  },
});

export default checkEmailQuery;
