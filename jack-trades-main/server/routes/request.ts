import express from 'express';
import {
  getAllRequest, addRequests, deleteRequest, updateRequest, getAllOfferedProducts,

} from '../controllers';
import { authentication } from '../middlewares';

const router = express.Router();

router.get('/', authentication, getAllRequest);
router.get('/products/:requestId', authentication, getAllOfferedProducts);
router.post('/', authentication, addRequests);
router.delete('/:requestId', authentication, deleteRequest);
router.put('/:requestId', authentication, updateRequest);
// Note: the order of the routes matters
export default router;
