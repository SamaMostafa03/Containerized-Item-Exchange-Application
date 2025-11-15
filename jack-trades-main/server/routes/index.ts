import express from 'express';

import accountRouter from './account';
import websiteRouter from './website';
import userRouter from './users';
import productsRouter from './products';
import requestRouter from './request';
import notificationRouter from './notifications';
import wishListRouter from './wishlist';
import ChatRouter from './chat';

const router = express.Router();
router.use('/account', accountRouter);
router.use('/website', websiteRouter);
router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/requests', requestRouter);
router.use('/notifications', notificationRouter);
router.use('/wishlist', wishListRouter);
router.use('/chat', ChatRouter);
export default router;
