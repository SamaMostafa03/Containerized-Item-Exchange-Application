import express from 'express';
import {
  getAllWishListItems, addToWishList, deleteFromWishList, checkWishList,
} from '../controllers';
import { authentication } from '../middlewares';

const router = express.Router();

router.get('/', authentication, getAllWishListItems);
router.get('/:productId', authentication, checkWishList);

router.post('/:productId', authentication, addToWishList);
router.delete('/:productId', authentication, deleteFromWishList);
export default router;
