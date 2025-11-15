import express from 'express';

import { authentication } from '../middlewares';

import {
  addMessage, getAllMessages, getUnSeenMessages, updateUnseenMessages,
} from '../controllers';

const router = express.Router();
router.post('/:receiverId/addMessage', authentication, addMessage);
router.get('/getUnseenMessages', authentication, getUnSeenMessages);
router.put('/:senderId/updateUnseenMessages', authentication, updateUnseenMessages);
router.get('/:receiverId', authentication, getAllMessages);
export default router;
