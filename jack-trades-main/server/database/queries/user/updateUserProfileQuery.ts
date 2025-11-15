import { User } from '../../../models';

const updateUserProfileQuery = async (
  id:number,
  image:string,
  bio:string,
  email:string,
  first_name:string,
  last_name:string,
) => User.update({
  bio,
  image,
  email,
  first_name,
  last_name,
}, {
  where: { id },
});

export default updateUserProfileQuery;
