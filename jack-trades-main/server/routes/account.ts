import express from 'express';
import {
  signIn, signup, signOut, checkAuth,
} from '../controllers';

const router = express.Router();
router.get('/', checkAuth);
router.post('/signup', signup);
router.post('/signin', signIn);
router.post('/logout', signOut);

export default router;
