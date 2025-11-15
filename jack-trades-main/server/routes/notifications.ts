/* eslint-disable @typescript-eslint/indent */
import express from 'express';
import {
    getAllNotifications, viewItemDetails, getUnseenNotifications, updateNotifications,
} from '../controllers';
import { authentication } from '../middlewares';

const router = express.Router();

router.get('/', authentication, getAllNotifications);
router.get('/:notificationId/view', viewItemDetails);
router.get('/unseen', authentication, getUnseenNotifications);
router.put('/update', authentication, updateNotifications);

export default router;
