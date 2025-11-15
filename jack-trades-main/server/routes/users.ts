import express from 'express';
import {
  getUserProducts, getUserProfile, getUserWishList, updateUserProfile,
} from '../controllers';
import { authentication } from '../middlewares';

const router = express.Router();

router.get('/:userId/products', getUserProducts);
router.get('/favorites', getUserWishList);
router.get('/:userId?', getUserProfile);
router.put('/', authentication, updateUserProfile);
// Note: the order of the routes matters

export default router;
