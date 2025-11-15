import { Request, Response, NextFunction } from 'express';

import { compare } from 'bcrypt';
import { signinValidationSchema } from '../../validation';
import { signinQuery } from '../../database/queries';
import { CustomError } from '../../helpers';
import generateToken from '../../helpers/generateToken';

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = await signinValidationSchema(req.body);

    const user = await signinQuery({ email });

    if (!user) throw new CustomError(401, 'you have to signup first');

    const isPasswordTrue = await compare(password, user.hashedPassword);

    if (!isPasswordTrue) throw new CustomError(401, 'You entered a wrong password');

    const token = await generateToken(user.id, email);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }).json({ message: 'logged successfully' });
  } catch (err) {
    next(err);
  }
};

export default signIn;
