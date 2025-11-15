import { NextFunction, Response } from 'express';
import { IRequestPayload } from '../../interfaces/IRequestPayload';
import { updateUserprofileValidation } from '../../validation';
import { updateUserProfileQuery, checkEmailQuery } from '../../database/queries';
import { CustomError } from '../../helpers';

const updateUserProfile = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      image, bio, email, first_name, last_name,
    } = req.body;
    await updateUserprofileValidation.validateAsync({
      image, bio, email, first_name, last_name,
    });
    const queryResult = await checkEmailQuery(+id, email);

    if (queryResult) throw new CustomError(400, 'This email is already used, Please try another one');
    await updateUserProfileQuery(id, image, bio, email, first_name, last_name);
    res.json({ message: 'Your information updated successfully' });
  } catch (error) {
    next(error);
  }
};
export default updateUserProfile;
