import express from 'express';
import { getStatistics, getFeedback, addFeedback } from '../controllers';
import { authentication } from '../middlewares';

const router = express.Router();

router.get('/statistics', getStatistics);
router.get('/feedback', getFeedback);
router.post('/feedback', authentication, addFeedback);

export default router;
