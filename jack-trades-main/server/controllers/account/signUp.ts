import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { validateSighup } from '../../validation';
import { signupQuery, checkUserExist } from '../../database/queries/account';
import { CustomError } from '../../helpers';
import generateToken from '../../helpers/generateToken';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      firstName, lastName, email, password,
    } = await validateSighup(req.body);

    const checkResultQuery = await checkUserExist(email);

    if (checkResultQuery) throw new CustomError(400, 'This email is already exist,Please check your email again');

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await signupQuery({
      firstName, lastName, email, hashedPassword,
    });

    const userId = result.id;

    const token = await generateToken(userId, email);

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }).status(201).json({ message: 'Your Account Created Successfully' });
  } catch (err) {
    next(err);
  }
};

export default signup;
