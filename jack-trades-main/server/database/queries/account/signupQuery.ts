import { IUserInfo } from '../../../interfaces';
import { User } from '../../../models';

const checkUserExist = async (email:string) => User.findOne({
  where: { email },
});
const signupQuery = async ({
  firstName, lastName, email, hashedPassword,
}:IUserInfo) => User.create({
  first_name: firstName,
  last_name: lastName,
  email,
  hashedPassword,
});

export { signupQuery, checkUserExist };
